// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
   const session = await getToken({ req });

   if (!session) {
      const { protocol, host, pathname } = req.nextUrl;
      return NextResponse.redirect(
         `${protocol}//${host}/auth/login?p=${pathname}`
      );
   }

   return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
   matcher: "/checkout/:path*",
};
