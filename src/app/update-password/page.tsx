"use client";
import { Suspense, useEffect } from "react";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "../auth/login.module.css";
import { updatePasswordAction } from "@/lib/actions/auth.action";
import AuthWrapper from "@/components/authWrapper/AuthWrapper";
import Input from "@/components/input/Input";

// 1. The Main Page Wrapper (This satisfies the Next.js build requirement)
export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={<div>Loading reset form...</div>}>
      <UpdatePasswordForm />
    </Suspense>
  );
}

// 2. The Actual Logic (Moved to a separate function/component)
function UpdatePasswordForm() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  const [formState, action, isPending] = useActionState(updatePasswordAction, {
    errors: null,
    success: false,
    message: "",
  });

  // Handle missing key inside the suspended component
  if (!key) {
    return (
      <AuthWrapper>
        <h2>Invalid Link</h2>
        <p>This password reset link is invalid or missing.</p>
        <Link href="/auth/reset-password">Request a new link</Link>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <form action={action} className={styles.form} noValidate>
        <h2 className={styles.heading}>Set Your Password</h2>
        {formState.message && !formState.success && (
          <div className={styles.alertError}>{formState.message}</div>
        )}

        {formState.success ? (
          <Link href="/auth?mode=login">Go to Login</Link>
        ) : (
          <>
            <input type="hidden" name="key" value={key} />
            <Input
              name="password"
              type="password"
              placeholder="New Password"
              defaultValue={formState.enteredValues?.password || ""}
            />
            {formState.errors?.password && (
              <p className={styles.errorText}>{formState.errors.password[0]}</p>
            )}
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              defaultValue={formState.enteredValues?.confirmPassword || ""}
            />

            {formState.errors?.confirmPassword && (
              <p className={styles.errorText}>
                {formState.errors.confirmPassword[0]}
              </p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className={styles.submitBtn}
            >
              {isPending ? "Updating..." : "Set Password"}
            </button>
          </>
        )}
      </form>
    </AuthWrapper>
  );
}
