"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/login/Logo";
import { PageBackground } from "@/components/ui/PageBackground";

function UserIcon() {
  return (
    <svg
      className="h-5 w-5 text-white/40"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="h-5 w-5 text-white/40"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  if (hidden) {
    return (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        />
      </svg>
    );
  }

  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });

      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        setError(data.message || "Giriş başarısız.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-1 flex-col">
      <PageBackground overlay="login" />

      <div className="relative flex flex-1 flex-col px-6 py-10">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-md">
            <Logo />

            <div className="mt-10">
              <h1 className="text-3xl font-bold text-white">Hoş Geldiniz!</h1>
              <p className="mt-2 text-sm text-white/60">
                Hesabınıza giriş yaparak devam edin.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm text-white/80"
                >
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                    <UserIcon />
                  </span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="Kullanıcı adınızı giriniz"
                    className="w-full rounded-xl border border-border bg-surface/80 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-accent-light focus:ring-1 focus:ring-accent-light"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-white/80"
                >
                  Şifre
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                    <LockIcon />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Şifrenizi giriniz"
                    className="w-full rounded-xl border border-border bg-surface/80 py-3.5 pl-12 pr-12 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-accent-light focus:ring-1 focus:ring-accent-light"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/70"
                    aria-label={
                      showPassword ? "Şifreyi gizle" : "Şifreyi göster"
                    }
                  >
                    <EyeIcon hidden={!showPassword} />
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <span className="text-sm text-accent-light">Şifremi Unuttum?</span>
              </div>

              {error && (
                <p className="text-center text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
              >
                <LoginIcon />
                {pending ? "GİRİŞ YAPILIYOR..." : "GİRİŞ YAP"}
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-white/40">
          <p>AS ÇİMENTO © 2026</p>
          <p className="mt-1">Tüm Hakları Saklıdır.</p>
        </footer>
      </div>
    </div>
  );
}
