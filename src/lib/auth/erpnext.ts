import axios from 'axios';
import { SessionUser } from '@/types/session';

const ERPNEXT_URL = process.env.ERPNEXT_URL;
const API_KEY = process.env.ERPNEXT_API_KEY;
const API_SECRET = process.env.ERPNEXT_API_SECRET;

export async function loginWithERPNext(
  email: string,
  password: string,
): Promise<SessionUser> {
  // 1. Login
  let erpRes;
  try {
    erpRes = await axios.post(
      `${process.env.ERPNEXT_URL}/api/method/login`,
      { usr: email, pwd: password },
      { headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      throw new Error('Invalid email or password');
    }
    if (axios.isAxiosError(err) && err.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to ERPNext server');
    }
    throw new Error('Login failed. Please try again.');
  }

  console.log('ERPNext login response:', erpRes.status, erpRes.data);

  if (erpRes.data.message !== 'Logged In' && erpRes.data.message !== 'No App') {
    console.log('Error occured Not loged in');
    throw new Error('Invalid credentials');
  }

  // 2. Extract Cookies
  const cookies = erpRes.headers['set-cookie'];
  if (!cookies?.length) throw new Error('No session cookies from ERPNext');

  const cookieHeader = cookies.join('; ');

  //   3. Get User email
  const profileRes = await axios.get(
    `${ERPNEXT_URL}/api/method/frappe.auth.get_logged_user`,
    { headers: { Cookie: cookieHeader } },
  );

  const userEmail = profileRes.data.message;

  //  4. Get full user details
  const userDetailsRes = await axios.get(
    `${ERPNEXT_URL}/api/resource/User/${userEmail}`,
    { headers: { Cookie: cookieHeader } },
  );

  const userData = userDetailsRes.data.data;
  // const erpRoles = userData.roles?.map((r: any) => r.role) ?? [];
  // const role = mapERPNEXTRole(erpRoles);

  return {
    email: userData.email ?? userEmail,
    fullName: userData.full_name ?? userData.name,
    userImage: userData.user_image ?? null,
    role: 'customer' as const, // default role, or map from ERPnext roles
  };
}

export async function signupWithERPNext(
  email: string,
  fullName: string,
): Promise<void> {
  try {
    await axios.post(
      `${ERPNEXT_URL}/api/resource/User`,
      {
        email,
        first_name: fullName,
        enabled: 1,
        roles: [{ role: 'Customer' }],
        send_welcome_email: 1,
      },
      {
        headers: {
          Authorization: `token ${API_KEY}:${API_SECRET}`,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const msg =
        err.response?.data?.exception || err.response?.data?.message || '';
      if (
        msg.includes('already registered') ||
        msg.includes('already exists') ||
        msg.includes('DuplicateEntryError')
      ) {
        throw new Error('An account with this email already exist');
      }
      if (err.code === 'ECONNREFUSED') {
        throw new Error('Cannot connect to server');
      }
    }
    if (axios.isAxiosError(err)) {
      console.log(
        'ERPNext signup error:',
        err.response?.status,
        err.response?.data,
      );
    } else {
      console.log('Unexpected error:', err);
    }
    throw new Error('Signup failed. Pleaes try again');
  }
}

export async function resetPasswordERPNext(email: string): Promise<void> {
  try {
    await axios.post(
      `${ERPNEXT_URL}/api/method/frappe.core.doctype.user.user.reset_password`,
      { user: email },
      {
        headers: {
          Authorization: `token ${API_KEY}:${API_SECRET}`,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to server');
    }
    throw new Error('Failed to send reset link. Please try again.');
  }
}

// Set new password using the key from the email link
export async function updatePasswordERPNext(
  key: string,
  newPassword: string,
): Promise<void> {
  try {
    const res = await axios.post(
      `${ERPNEXT_URL}/api/method/frappe.core.doctype.user.user.update_password`,
      { new_password: newPassword, key },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    console.log('Update password response:', res.status, res.data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const msg = err.response?.data?.message || '';
      if (msg.includes('Link expired') || msg.includes('Invalid key')) {
        throw new Error('This link has expired. Please request a new one.');
      }
    }
    throw new Error('Failed to update password. Please try again.');
  }
}
