// import { withAuth } from "next-auth/middleware";
export { default } from "next-auth/middleware";
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

export const config = {
   matcher: "/checkout/:path*",
};
