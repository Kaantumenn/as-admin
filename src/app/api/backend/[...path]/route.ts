import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiUrl } from "@/config/api";
import { getDirectApiUrl } from "@/lib/api/get-base-url";
import { TOKEN_COOKIE } from "@/lib/auth";

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: "Oturum bulunamadı." }, { status: 401 });
  }

  if (!getDirectApiUrl()) {
    return NextResponse.json(
      { message: "API adresi tanımlı değil. API_URL ayarlayın." },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  const targetUrl = apiUrl(`/${path.join("/")}${request.nextUrl.search}`);

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
