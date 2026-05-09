import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getUserProfile } from "@/lib/auth/oauth";
import { getSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const session = await getSession();
  const storedState = session.oauthState;
  const resolvedStoredState =
    typeof storedState === "string" ? storedState : storedState?.state;

  // Validate state (CSRF protection)
  if (!state || !resolvedStoredState || state !== resolvedStoredState) {
    console.error("OAuth state mismatch:", { state, storedState });
    return NextResponse.redirect(
      new URL("/auth?error=invalid_state", request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(new URL("/auth?error=no_code", request.url));
  }

  try {
    const tokens = await exchangeCodeForTokens(code);
    const user = await getUserProfile(tokens.access_token);
    const expiresAt = Date.now() + tokens.expires_in * 1000;

    session.user = {
      ...user,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt,
    };
    session.tokens = tokens;
    session.isLoggedIn = true;
    session.expiresAt = expiresAt;
    delete session.oauthState;

    await session.save();

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(
      new URL("/auth?error=auth_failed", request.url)
    );
  }
}
