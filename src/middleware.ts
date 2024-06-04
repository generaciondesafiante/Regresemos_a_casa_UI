import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const baseUrl =
      req.headers.get("x-forwarded-host") || req.headers.get("host");
    const redirectTo = `${
      req.headers.get("x-forwarded-proto") || "http"
    }://${baseUrl}/login`;
    const baseUrl =
      req.headers.get("x-forwarded-host") || req.headers.get("host");
    const redirectTo = `${
      req.headers.get("x-forwarded-proto") || "http"
    }://${baseUrl}/login`;
    return NextResponse.redirect(redirectTo);
  }

  if (req.nextUrl.pathname.includes("/dashboard/adminPanel")) {
    if (!session.admin) {
      console.error("error");
      const baseUrl =
        req.headers.get("x-forwarded-host") || req.headers.get("host");
      const redirectTo = `${
        req.headers.get("x-forwarded-proto") || "http"
      }://${baseUrl}/dashboard`;
      return NextResponse.redirect(redirectTo);
    }
  }
  console.log(session.admin);

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
