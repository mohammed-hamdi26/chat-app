import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const idUser = request.cookies.get("id")?.value;
  const randomUser = Math.ceil(Math.random() * 25);
  console.log("user", idUser);

  const res = NextResponse.next();
  if (!idUser) {
    res.cookies.set("id", `${randomUser}`);
  }

  // return NextResponse.redirect(new URL("/home", request.url));
  return res;
}

export const config = {
  matcher: "/",
};
