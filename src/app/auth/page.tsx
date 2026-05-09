"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Link from "next/link";

import styles from "./login.module.css";
import authAction from "@/lib/actions/auth.action";
import AuthWrapper from "@/components/authWrapper/AuthWrapper";
import Input from "@/components/input/Input";

export default function AuthPage() {
  return (
    <Suspense fallback={<div className={styles.authWrapper}>Loading....</div>}>
      <AuthForm />
    </Suspense>
  );
}

// AuthForm

function AuthForm() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formState, action, isPending] = useActionState(authAction, {
    errors: null,
    success: false,
  });

  useEffect(() => {
    if (formState.success && formState.redirectTo) {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push(formState.redirectTo);
    }
  }, [formState.success, formState.redirectTo, queryClient, router]);

  return (
    <AuthWrapper mode={mode}>
      <div
        className={`${
          mode === "signup" ? styles.signupCard : styles.loginCard
        }${styles.card}`}
      >
        <div className={styles.tabs}>
          <Link
            href="/auth?mode=login"
            className={`${styles.tabLink} ${
              mode === "login" ? styles.activeTab : styles.inactiveTab
            }`}
          >
            Login
          </Link>
          <Link
            href="/auth?mode=signup"
            className={`${styles.tabLink} ${
              mode === "signup" ? styles.activeTab : styles.inactiveTab
            }`}
          >
            Sign Up
          </Link>
        </div>

        <form action={action} className={styles.form} noValidate>
          <Input type="hidden" name="auth_mode" value={mode} />
          {/* Success message (signup) */}
          {formState.success && formState.message && (
            <p className={styles.successText}>{formState.message}</p>
          )}

          {formState.message && !formState.success && (
            <p className={styles.errorText}>*{formState.message}</p>
          )}
          {/* Only show form if not yet successful signup */}
          {!(formState.success && mode === "signup") && (
            <>
              {/* Full Name — signup only */}
              {mode === "signup" && (
                <>
                  <Input
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    defaultValue={
                      (formState.enteredValues?.fullName as string) ?? ""
                    }
                  />
                  {formState.errors?.fullName && (
                    <p className={styles.errorText}>
                      *{formState.errors.fullName[0]}
                    </p>
                  )}
                </>
              )}
              <Input
                name="email"
                type="email"
                placeholder="Email"
                defaultValue={(formState.enteredValues?.email as string) ?? ""}
              />
              {formState.errors?.email && (
                <p className={styles.errorText}>*{formState.errors.email[0]}</p>
              )}
              {mode === "login" && (
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  defaultValue={
                    (formState.enteredValues?.password as string) ?? ""
                  }
                />
              )}
              {mode === "login" && formState.errors?.password && (
                <p className={styles.errorText}>
                  *{formState.errors.password[0]}
                </p>
              )}

              {/* General error message (e.g., "Invalid credentials") */}
              {formState.message && !formState.success && (
                <p className={styles.errorText}>*{formState.message}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className={styles.submitBtn}
              >
                {mode === "signup" ? "Sign Up" : "Login"}
              </button>
              {mode === "login" && (
                <Link href="/auth/reset-password" className={styles.backLink}>
                  Forgot Password?
                </Link>
              )}
            </>
          )}
          <Link href="/" className={styles.backLink}>
            Back to Shopping
          </Link>
        </form>
      </div>
    </AuthWrapper>
  );
}
