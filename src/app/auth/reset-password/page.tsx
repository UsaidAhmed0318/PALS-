'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import styles from '../login.module.css';
import { resetPasswordAction } from '@/lib/actions/auth.action';
import AuthWrapper from '@/components/authWrapper/AuthWrapper';
import Input from '@/components/input/Input';

export default function ResetPasswordPage() {
  const [formState, action, isPending] = useActionState(resetPasswordAction, {
    success: false,
    message: '',
  });

  return (
    <AuthWrapper>
      <form action={action} className={styles.form}>
        <p>Enter your email and we will send you a reset link.</p>
        {formState.message && (
          <p
            className={
              formState.success ? styles.successText : styles.errorText
            }>
            {formState.message}
          </p>
        )}

        {!formState.success && (
          <>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              className={styles.input}
            />

            <button
              type="submit"
              disabled={isPending}
              className={styles.submitBtn}>
              {isPending ? 'Sending...' : 'Send Reset Link'}
            </button>
          </>
        )}

        <Link href="/auth?mode=login" className={styles.backLink}>
          Back to Login
        </Link>
      </form>
    </AuthWrapper>
  );
}
