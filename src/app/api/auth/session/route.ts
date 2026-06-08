import { NextResponse } from "next/server";
import { TOKEN_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const { accessToken } = (await request.json()) as { accessToken?: string };

  if (!accessToken) {
    return NextResponse.json({ message: "Token gerekli." }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
