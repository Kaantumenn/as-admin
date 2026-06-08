export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Ana Sayfa</h1>
      <p className="mt-2 text-sm text-white/60">
        Hoş geldiniz. Panel hazır, buraya içerik ekleyebilirsiniz.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {["Kullanıcılar", "İçerik", "Ayarlar"].map((title) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-surface/80 p-5 backdrop-blur-sm"
          >
            <h2 className="font-medium text-white">{title}</h2>
            <p className="mt-1 text-sm text-white/50">Yakında eklenecek</p>
          </div>
        ))}
      </div>
    </div>
  );
}
