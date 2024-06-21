import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getCurrentMember } from "./actions/member.action";

export async function middleware(request: NextRequest) {
  const user = await getCurrentMember();

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user || !user.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
