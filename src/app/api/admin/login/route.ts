import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, makeAdminCookieValue, verifyAdminPassword } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, error: 'Admin login is not configured yet.' },
      { status: 500 }
    );
  }

  let password = '';
  try {
    const body = await request.json();
    password = String(body?.password ?? '');
  } catch {
    password = '';
  }

  const ok = await verifyAdminPassword(password);
  if (!ok) {
    return NextResponse.json({ success: false, error: 'Wrong password.' }, { status: 401 });
  }

  const cookieValue = await makeAdminCookieValue();
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE_NAME, cookieValue ?? '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
