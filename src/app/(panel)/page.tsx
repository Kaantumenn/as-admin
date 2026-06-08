import Link from "next/link";

const modules = [
  {
    href: "/gemi",
    title: "Gemi",
    description: "Gemi ve beyanname yönetimi.",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Ana Sayfa</h1>
      <p className="mt-2 text-sm text-white/60">
        Hoş geldiniz. Yönetim modüllerine buradan ulaşabilirsiniz.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="rounded-xl border border-border bg-surface/80 p-5 backdrop-blur-sm transition-colors hover:border-accent-light/40"
          >
            <h2 className="font-medium text-white">{module.title}</h2>
            <p className="mt-1 text-sm text-white/50">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
