import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { TOKEN_COOKIE } from "@/lib/auth";

export async function GET() {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Oturum bulunamadı." }, { status: 401 });
  }

  return NextResponse.json({ accessToken: token });
}
