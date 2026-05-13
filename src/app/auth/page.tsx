'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

import styles from './login.module.css';
import authAction from '@/lib/actions/auth.action';
import AuthWrapper from '@/components/authWrapper/AuthWrapper';

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f4f8fb' }} />}>
      <AuthForm />
    </Suspense>
  );
}

function AuthForm() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formState, action, isPending] = useActionState(authAction, {
    errors: null,
    success: false,
  });

  useEffect(() => {
    if (formState.success && formState.redirectTo) {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push(formState.redirectTo);
    }
  }, [formState.success, formState.redirectTo, queryClient, router]);

  return (
    <AuthWrapper mode={mode}>
      {/* Tab switcher */}
      <div className={styles.tabs}>
        <Link
          href="/auth?mode=login"
          className={`${styles.tabLink} ${mode === 'login' ? styles.activeTab : styles.inactiveTab}`}
        >
          Sign In
        </Link>
        <Link
          href="/auth?mode=signup"
          className={`${styles.tabLink} ${mode === 'signup' ? styles.activeTab : styles.inactiveTab}`}
        >
          Register
        </Link>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <h2 className={styles.heading}>
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className={styles.subheading}>
            {mode === 'login'
              ? 'Sign in to your EoriCart account'
              : 'Join thousands of happy customers'}
          </p>

          {/* Global success message */}
          {formState.success && formState.message && (
            <div className={styles.successText}>
              <CheckCircleIcon style={{ width: 18, height: 18, flexShrink: 0 }} />
              {formState.message}
            </div>
          )}

          {/* Global error message */}
          {formState.message && !formState.success && (
            <div className={styles.errorAlert}>
              <ExclamationCircleIcon style={{ width: 18, height: 18, flexShrink: 0 }} />
              {formState.message}
            </div>
          )}

          {!(formState.success && mode === 'signup') && (
            <form action={action} className={styles.form} noValidate>
              <input type="hidden" name="auth_mode" value={mode} />

              {mode === 'signup' && (
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    className={styles.authInput}
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    defaultValue={(formState.enteredValues?.fullName as string) ?? ''}
                    autoComplete="name"
                  />
                  {formState.errors?.fullName && (
                    <p className={styles.errorText}>{formState.errors.fullName[0]}</p>
                  )}
                </div>
              )}

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="email">Email Address</label>
                <input
                  id="email"
                  className={styles.authInput}
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  defaultValue={(formState.enteredValues?.email as string) ?? ''}
                  autoComplete="email"
                />
                {formState.errors?.email && (
                  <p className={styles.errorText}>{formState.errors.email[0]}</p>
                )}
              </div>

              {mode === 'login' && (
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="password">Password</label>
                  <input
                    id="password"
                    className={styles.authInput}
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    defaultValue={(formState.enteredValues?.password as string) ?? ''}
                    autoComplete="current-password"
                  />
                  {formState.errors?.password && (
                    <p className={styles.errorText}>{formState.errors.password[0]}</p>
                  )}
                  <Link href="/auth/reset-password" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                </div>
              )}

              <button type="submit" disabled={isPending} className={styles.submitBtn}>
                {isPending
                  ? 'Please wait...'
                  : mode === 'signup'
                    ? 'Create Account'
                    : 'Sign In'}
              </button>

              <Link href="/" className={styles.backLink}>
                ← Continue shopping without account
              </Link>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </AuthWrapper>
  );
}
