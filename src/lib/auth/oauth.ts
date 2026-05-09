import axios from "axios";
import { OAuthTokens, UserProfile } from "@/types/session";

const ERPNEXT_URL = process.env.ERPNEXT_URL!;
const CLIENT_ID = process.env.OAUTH_CLIENT_ID!;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET!;
const REDIRECT_URI = `${process.env.NEXTAUTH_URL}/api/auth/callback`;

export function getAuthorizationUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "all openid",
    state,
  });

  return `${ERPNEXT_URL}/api/method/frappe.integrations.oauth2.authorize?${params}`;
}

export async function exchangeCodeForTokens(
  code: string
): Promise<OAuthTokens> {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const response = await axios.post<OAuthTokens>(
    `${ERPNEXT_URL}/api/method/frappe.integrations.oauth2.get_token`,
    params,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return response.data;
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<OAuthTokens> {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const response = await axios.post<OAuthTokens>(
    `${ERPNEXT_URL}/api/method/frappe.integrations.oauth2.get_token`,
    params,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return response.data;
}

export async function getUserProfile(
  accessToken: string
): Promise<UserProfile> {
  const response = await axios.get<UserProfile>(
    `${ERPNEXT_URL}/api/method/frappe.integrations.oauth2.openid_profile`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return response.data;
}
