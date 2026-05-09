"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./config";
import { SessionData, SessionUser } from "@/types/session";
import axios from "axios";

// Get session (Server Action, Route Handler, layouts)
export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

// Save user to session
export async function saveUserSession(user: SessionUser) {
  const session = await getSession();
  session.user = user;
  session.isLoggedIn = true;
  await session.save();
}

export async function setSessionData(data: Partial<SessionData>) {
  const session = await getSession();
  Object.assign(session, data);
  await session.save();
}

// Clear session (Logout)
export async function clearSession() {
  const session = await getSession();

  // logout from ERPNext
  try {
    await axios.get(`${process.env.ERPNEXT_URL}/api/method/logout`);
  } catch {
    // Ignore errors — ERPNext might already be logged out
  }

  // Destroy local session
  session.destroy();
}

// Get current logged-in user
export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getSession();
  return session.isLoggedIn ? session.user ?? null : null;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();

  if (!session.isLoggedIn || !session.tokens || !session.expiresAt) {
    return false;
  }

  // Check if token is expired (with 5min buffer)
  const isExpired = Date.now() > session.expiresAt - 300000;

  return !isExpired;
}

// Get access token from session user
export async function getAccessToken(): Promise<string | null> {
  const session = await getSession();
  return session.tokens?.access_token || session.user?.accessToken || null;
}

// Get refresh token from session user
export async function getRefreshToken(): Promise<string | null> {
  const session = await getSession();
  return session.tokens?.refresh_token || session.user?.refreshToken || null;
}
