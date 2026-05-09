import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { validateRoute } from '../routes';
import { buildAuthHeaders } from '../auth-headers';
import { getAccessToken, getRefreshToken, setSessionData } from '@/lib/session';
import { refreshAccessToken } from '@/lib/auth/oauth';
import { AuthMode } from '@/types/erpnext';

if (!process.env.ERPNEXT_URL) throw new Error('Missing ERPNEXT_URL');
const ERPNEXT_URL = process.env.ERPNEXT_URL!;

interface ERPNextRequestBody {
  [key: string]: unknown;
}

/**
 * Make request to ERPNext with appropriate authentication
 */
async function makeERPNextRequest(
  path: string,
  method: string,
  authMode: AuthMode,
  accessToken?: string,
  body?: ERPNextRequestBody,
  searchParams?: URLSearchParams,
): Promise<unknown> {
  const qs = searchParams?.toString();
  const url = `${ERPNEXT_URL}${path}${qs ? `?${qs}` : ''}`;

  try {
    const baseUrl = ERPNEXT_URL.endsWith('/')
      ? ERPNEXT_URL.slice(0, -1)
      : ERPNEXT_URL;
    const fullUrl = new URL(baseUrl + path);

    if (searchParams) {
      searchParams.forEach((value, key) => {
        fullUrl.searchParams.set(key, value);
      });
    }

    const headers = buildAuthHeaders(authMode, accessToken);

    const config: AxiosRequestConfig = {
      method,
      url: fullUrl.toString(),
      headers,
      timeout: 30000,
    };

    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      config.data = body;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Enhanced request handler with automatic token refresh
 */
async function handleRequest(request: NextRequest, method: string) {
  try {
    const pathname = request.nextUrl.pathname;
    const apiPath = pathname.replace('/api/proxy', '');
    console.log(`[PROXY] ${method} ${apiPath}`);

    // SECURITY: Validate route against allowlist
    const validation = validateRoute(apiPath, method);

    if (!validation.allowed) {
      console.error(`[PROXY BLOCKED] ${apiPath}: ${validation.reason}`);
      return NextResponse.json(
        {
          error: 'Forbidden',
          message: 'This route is not allowed through the proxy',
          detail: validation.reason,
        },
        { status: 403 },
      );
    }

    const authMode = validation.authMode!;
    console.log(`[PROXY] Auth mode: ${authMode}`);

    // Get access token if OAuth mode
    let accessToken: string | undefined;
    if (authMode === AuthMode.OAUTH) {
      accessToken = (await getAccessToken()) || undefined;

      if (!accessToken) {
        return NextResponse.json(
          {
            error: 'Unauthorized',
            message: 'Authentication required for this resource',
            requiresAuth: true,
          },
          { status: 401 },
        );
      }
    }

    const searchParams = request.nextUrl.searchParams;

    let body: ERPNextRequestBody | undefined;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        body = await request.json();
      } catch {
        body = undefined;
      }
    }

    // ============ FIRST ATTEMPT ============
    try {
      const data = await makeERPNextRequest(
        apiPath,
        method,
        authMode,
        accessToken,
        body,
        searchParams,
      );

      return NextResponse.json(data);
    } catch (firstError) {
      // ============ TOKEN REFRESH LOGIC ============
      if (
        authMode === AuthMode.OAUTH &&
        axios.isAxiosError(firstError) &&
        firstError.response?.status === 401
      ) {
        console.log('[PROXY] 401 detected, attempting token refresh...');

        try {
          const refreshToken = await getRefreshToken();

          if (!refreshToken) {
            console.error('[PROXY] No refresh token available');
            return NextResponse.json(
              {
                error: 'Session expired',
                message: 'Please login again',
                requiresAuth: true,
              },
              { status: 401 },
            );
          }

          const newTokens = await refreshAccessToken(refreshToken);
          console.log('[PROXY] Token refresh successful');

          await setSessionData({
            tokens: newTokens,
            expiresAt: Date.now() + newTokens.expires_in * 1000,
          });

          // ============ RETRY WITH NEW TOKEN ============
          const retryData = await makeERPNextRequest(
            apiPath,
            method,
            authMode,
            newTokens.access_token,
            body,
            searchParams,
          );

          return NextResponse.json(retryData);
        } catch (refreshError) {
          console.error('[PROXY] Token refresh failed:', refreshError);

          return NextResponse.json(
            {
              error: 'Authentication failed',
              message: 'Session expired. Please login again.',
              requiresAuth: true,
            },
            { status: 401 },
          );
        }
      }

      throw firstError;
    }
  } catch (error) {
    console.error('[PROXY ERROR]', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      return NextResponse.json(
        {
          error: axiosError.response?.data || 'ERPNext request failed',
          status: axiosError.response?.status,
          message: axiosError.message,
        },
        { status: axiosError.response?.status || 500 },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { error: 'Internal proxy error', message: errorMessage },
      { status: 500 },
    );
  }
}

// Export HTTP method handlers
export async function GET(request: NextRequest) {
  return handleRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
  return handleRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
  return handleRequest(request, 'PUT');
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request, 'PATCH');
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, 'DELETE');
}
