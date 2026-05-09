import { AuthMode } from '@/types/erpnext';

const ERPNEXT_API_KEY = process.env.ERPNEXT_API_KEY!;
const ERPNEXT_API_SECRET = process.env.ERPNEXT_API_SECRET!;

export interface AuthHeaders {
  [key: string]: string;
}

/**
 * Build authentication headers based on auth mode
 */
export function buildAuthHeaders(
  authMode: AuthMode,
  accessToken?: string
): AuthHeaders {
  const headers: AuthHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (authMode === AuthMode.API_KEY) {
    // Static API Key authentication (Service Account)
    headers['Authorization'] = `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`;
  } else if (authMode === AuthMode.OAUTH) {
    // OAuth Bearer token (User Delegation)
    if (!accessToken) {
      throw new Error('OAuth mode requires access token');
    }
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
}