
import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

  const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET})

  console.log({session});
  if(!session){
    const requestedPage = req.nextUrl.pathname
    const url = req.nextUrl.clone()
    url.pathname=  `/loginPage`
    url.search= `${requestedPage}`
    return NextResponse.redirect(url)
  }
 
  return NextResponse.next()
}
export const config = {
  matcher: ["/dashboard/:path*"],
};