import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const sesionAuth = await getToken({
    req,
    // secret: process.env.NEXT_PUBLIC_API_URL,
  
  });
  console.log(sesionAuth);
  //   return NextResponse.redirect(new URL('/home', req.url))
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard'],
};
