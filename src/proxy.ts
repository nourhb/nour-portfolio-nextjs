import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'admin_auth';
const AUTH_SALT = '|nour-admin-v1';

// Self-contained: proxy runs at the edge, so we don't import shared modules.
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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public: the login page and the login API must stay reachable.
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const cookieToken = request.cookies.get(COOKIE_NAME)?.value;

  let authed = false;
  if (adminPassword && cookieToken) {
    const expected = await tokenFor(adminPassword);
    authed = timingSafeEqual(cookieToken, expected);
  }

  if (authed) return NextResponse.next();

  // Fail closed: without a valid cookie nothing under /admin or /api/admin works.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  const url = request.nextUrl.clone();
  url.pathname = '/admin/login';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
