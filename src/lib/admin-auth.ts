import { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'admin_auth';
const AUTH_SALT = '|nour-admin-v1';

async function tokenFor(secret: string): Promise<string> {
  const data = new TextEncoder().encode(secret + AUTH_SALT);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** True when the request carries a valid admin auth cookie. */
export async function isAdminAuthed(request: NextRequest): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const cookieToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!adminPassword || !cookieToken) return false;
  const expected = await tokenFor(adminPassword);
  return timingSafeEqual(cookieToken, expected);
}

/** Cookie value to set after a successful login. */
export async function makeAdminCookieValue(): Promise<string | null> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return null;
  return tokenFor(adminPassword);
}

/** True when the submitted password matches ADMIN_PASSWORD (timing-safe). */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !password) return false;
  const expected = await tokenFor(adminPassword);
  const actual = await tokenFor(password);
  return timingSafeEqual(actual, expected);
}
