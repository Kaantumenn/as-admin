import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { TOKEN_COOKIE } from "@/lib/auth";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "";

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Oturum bulunamadı." }, { status: 401 });
  }

  if (!apiBase) {
    return NextResponse.json(
      { message: "API adresi tanımlı değil." },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  const targetUrl = `${apiBase.replace(/\/$/, "")}/${path.join("/")}${request.nextUrl.search}`;

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const body = hasBody ? await request.text() : undefined;

  const res = await fetch(targetUrl, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  const text = await res.text();

  return new NextResponse(text || null, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
