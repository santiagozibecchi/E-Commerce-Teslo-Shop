// import { withAuth } from "next-auth/middleware";
// export { default } from "next-auth/middleware";
// import { NextResponse, NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//    const session = await getToken({ req });

//    const { pathname } = req.nextUrl;
//    if (!session) {
//       const url = req.nextUrl.clone();
//       url.pathname = pathname;

//       return NextResponse.redirect(url);
//    }

//    return NextResponse.next();
// }

// export default withAuth(async function middleware(req: NextRequest) {
//    const session = await getToken({ req });

//    const { pathname } = req.nextUrl;

//    if (!session) {
//       const url = req.nextUrl.clone();
//       url.pathname = pathname;

//       return NextResponse.redirect(url);
//    }
//    return NextResponse.next();
// });

// export const config = {
//    matcher: "/checkout/:path*",
// };

import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
   // `withAuth` augments your `Request` with the user's token.
   function middleware(req) {
      // console.log(req.nextauth);
      const { role } = req.nextauth.token?.user as any;
      const validRoles = ["admin", "super-user", "seo"];

      if (!validRoles.includes(role)) {
         return NextResponse.redirect(new URL("/", req.url));
      }
   },
   {
      callbacks: {
         authorized: ({ token }) => !!token,
      },
   }
);

export const config = {
   matcher: ["/checkout/:path*", "/admin/:path*", "/api/admin/:path*"],
};
