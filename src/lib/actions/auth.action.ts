"use server";

import {
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/lib/validations/auth";

import {
  loginWithERPNext,
  signupWithERPNext,
  resetPasswordERPNext,
  updatePasswordERPNext,
} from "../auth/erpnext";
import { saveUserSession } from "../session/index";
import { SessionUser } from "@/types/session";

type AuthFormState = {
  errors: {
    email?: string[];
    password?: string[];
    fullName?: string[];
    confirmPassword?: string[];
  } | null;
  enteredValues?: {
    email?: FormDataEntryValue | null;
    password?: FormDataEntryValue | null;
    fullName?: FormDataEntryValue | null;
    confirmPassword?: FormDataEntryValue | null;
  };
  message?: string;
  success?: boolean;
  user?: SessionUser;
  redirectTo?: string;
};

const ROLE_REDIRECTS: Record<string, string> = {
  super_admin: "/admin/dashboard",
  warehouse_manager: "/warehouse/stock",
  customer: "/",
};

export default async function authAction(
  prevFormState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const mode = formData.get("auth_mode");
  const email = formData.get("email");
  const password = formData.get("password");
  const fullName = formData.get("fullName");

  // result.data is fully typed and validated
  if (mode === "login") {
    // Zod validates here
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      // Return field errors back to the UI
      return {
        errors: result.error.flatten().fieldErrors,
        enteredValues: { email, password },
        success: false,
      };
    }

    // Call login API
    try {
      const user = await loginWithERPNext(
        result.data.email,
        result.data.password,
      );

      await saveUserSession(user);
      return {
        errors: null,
        success: true,
        user,
        redirectTo: ROLE_REDIRECTS[user.role] ?? "/",
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      return {
        errors: null,
        success: false,
        message,
      };
    }
  } else if (mode === "signup") {
    // Zod validates here
    const result = signupSchema.safeParse({ email, fullName });
    if (!result.success) {
      // Return field errors back to the UI
      return {
        errors: result.error.flatten().fieldErrors,
        enteredValues: { email, password },
        success: false,
      };
    }
    // Call signup API
    try {
      await signupWithERPNext(result.data.email, result.data.fullName);

      return {
        errors: null,
        success: true,
        message: "Account created! check your email to set your password.",
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Signup failed. Please try again.";
      return {
        errors: null,
        success: false,
        message,
        enteredValues: { email, fullName },
      };
    }
  }
  return { errors: null, success: true };
}

export async function resetPasswordAction(
  prevState: { message?: string; success?: boolean },
  formData: FormData,
) {
  const email = formData.get("email");
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email." };
  }

  try {
    await resetPasswordERPNext(email);
    return {
      success: true,
      message: "Password reset link sent! Check your email.",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Something went wrong.";
    return { success: false, message };
  }
}

export async function updatePasswordAction(
  prevFormState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const key = formData.get("key") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!key)
    return { errors: null, success: false, message: "Invalid reset link." };

  const result = resetPasswordSchema.safeParse({ password, confirmPassword });

  if (!result.success) {
    const flattenedErrors = result.error.flatten().fieldErrors;

    return {
      errors: flattenedErrors,
      success: false,
      message: "Validation failed", // Always provide a message as a fallback
      enteredValues: { password, confirmPassword },
    };
  }

  // if (!password || password.length < 8) {
  //   return {
  //     success: false,
  //     message: 'Password must be at least 8 characters.',
  //   };
  // }
  // if (password !== confirmPassword) {
  //   return { success: false, message: 'Passwords do not match.' };
  // }

  try {
    await updatePasswordERPNext(key, password);
    return {
      errors: null,
      success: true,
      message: "Password updated! You can now log in.",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Something went wrong.";
    return { errors: null, success: false, message };
  }
}
