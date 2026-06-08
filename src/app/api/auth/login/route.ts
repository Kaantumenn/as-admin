import { NextResponse } from "next/server";
import { api, apiUrl } from "@/config/api";
import { TOKEN_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = (await request.json()) as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return NextResponse.json(
        { message: "Kullanıcı adı ve şifre gerekli." },
        { status: 400 },
      );
    }

    const res = await fetch(apiUrl(api.auth.login), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      let message = "Kullanıcı adı veya şifre hatalı.";

      try {
        const data = (await res.json()) as { message?: string };
        if (data.message) message = data.message;
      } catch {
        // varsayılan mesaj
      }

      return NextResponse.json({ message }, { status: res.status });
    }

    const { accessToken } = (await res.json()) as { accessToken: string };

    const response = NextResponse.json({ success: true });
    response.cookies.set(TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        message:
          "API sunucusuna bağlanılamadı. API_URL tanımlı mı ve API erişilebilir mi kontrol edin.",
      },
      { status: 502 },
    );
  }
}
