import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { Logo } from "@/components/login/Logo";
import { PageBackground } from "@/components/ui/PageBackground";

const navItems = [{ href: "/", label: "Ana Sayfa" }];

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-1">
      <PageBackground overlay="panel" />

      <div className="relative flex min-h-screen w-full">
        <aside className="flex w-60 flex-col border-r border-border bg-surface/60 backdrop-blur-sm">
          <div className="border-b border-border px-5 py-5">
            <Logo compact />
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-surface hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border p-3">
            <form action={logout}>
              <button
                type="submit"
                className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-white/60 transition-colors hover:bg-surface hover:text-white"
              >
                Çıkış Yap
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
