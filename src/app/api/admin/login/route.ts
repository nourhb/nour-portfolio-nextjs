import { NextRequest, NextResponse } from "next/server";
import { makeAdminCookieValue, setAdminCookie, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, error: "Set ADMIN_PASSWORD before using the admin." },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = String(body?.password ?? "");
  } catch {
    password = "";
  }

  if (!(await verifyAdminPassword(password))) {
    return NextResponse.json({ success: false, error: "Wrong password." }, { status: 401 });
  }

  const cookieValue = await makeAdminCookieValue();
  const response = NextResponse.json({ success: true });
  setAdminCookie(response, cookieValue ?? "");
  return response;
}
