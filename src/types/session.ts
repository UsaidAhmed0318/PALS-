export type UserRole =
  | "super_admin"
  | "warehouse_manager"
  | "customer"
  | "website_user";

export interface OAuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
  id_token?: string;
}

export interface UserProfile {
  email: string;
  fullName: string;
  role: UserRole;
  userImage?: string;
}

export interface OAuthState {
  state: string;
  createdAt?: number;
}

export interface SessionUser {
  email: string;
  fullName: string;
  role: UserRole;
  userImage?: string;
  // OAuth fields (only set when logged in via OAuth)
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
}

export interface SessionData {
  user?: SessionUser;
  isLoggedIn: boolean;
  tokens?: OAuthTokens;
  expiresAt?: number;
  oauthState?: OAuthState | string;
}

// Declare module augmentation for iron-session
declare module "iron-session" {
  interface IronSessionData {
    user?: SessionUser;
    isLoggedIn: boolean;
    tokens?: OAuthTokens;
    expiresAt?: number;
    oauthState?: OAuthState | string;
  }
}
