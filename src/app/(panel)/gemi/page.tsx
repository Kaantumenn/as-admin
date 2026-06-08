"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { api } from "@/config/api";
import { deleteGemiWithPassword } from "@/app/actions/gemi";
import { createGemi, getGemiler, updateGemi } from "@/lib/api/gemi";
import { BeyannameEditModal } from "@/components/panel/BeyannameEditModal";
import { Modal } from "@/components/panel/Modal";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Gemi, GemiForm } from "@/types/gemi";

const emptyForm: GemiForm = { shipName: "", targetTon: 0, note: "" };

function formatTon(value: number) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

export default function GemiPage() {
  const [items, setItems] = useState<Gemi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Gemi | null>(null);
  const [form, setForm] = useState<GemiForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState<Gemi | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingInProgress, setDeletingInProgress] = useState(false);
  const [beyannameModalOpen, setBeyannameModalOpen] = useState(false);
  const [beyannameShip, setBeyannameShip] = useState<Gemi | null>(null);

  const load = useCallback(async () => {
    if (!api.baseUrl) {
      setLoading(false);
      setError("API adresi tanımlı değil. NEXT_PUBLIC_API_URL ayarlayın.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setItems(await getGemiler());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Veriler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(item: Gemi) {
    setEditing(item);
    setForm({
      shipName: item.shipName,
      targetTon: item.targetTon,
      note: item.note ?? "",
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (editing) {
        await updateGemi(editing.id, form);
      } else {
        await createGemi(form);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt başarısız.");
    } finally {
      setSaving(false);
    }
  }

  function openBeyannameEdit(item: Gemi) {
    setBeyannameShip(item);
    setBeyannameModalOpen(true);
  }

  function openDelete(item: Gemi) {
    setDeleting(item);
    setDeletePassword("");
    setDeleteError(null);
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
    setDeleting(null);
    setDeletePassword("");
    setDeleteError(null);
  }

  async function handleDeleteConfirm(e: FormEvent) {
    e.preventDefault();
    if (!deleting) return;

    setDeletingInProgress(true);
    setDeleteError(null);

    const result = await deleteGemiWithPassword(deleting.id, deletePassword);

    if (result.error) {
      setDeleteError(result.error);
      setDeletingInProgress(false);
      return;
    }

    closeDeleteModal();
    setDeletingInProgress(false);
    await load();
  }

  return (
    <div>
      <PageHeader
        title="Gemi"
        description="Aktif gemileri listele, oluştur, güncelle ve sil."
        action={<Button onClick={openCreate}>Gemi Oluştur</Button>}
      />

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-surface/80 backdrop-blur-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-border bg-surface/60 text-white/60">
            <tr>
              <th className="px-4 py-3 font-medium">Gemi Adı</th>
              <th className="px-4 py-3 font-medium">Hedef Ton</th>
              <th className="px-4 py-3 font-medium">Toplam Ton</th>
              <th className="px-4 py-3 font-medium">Kalan Ton</th>
              <th className="px-4 py-3 font-medium">İlerleme</th>
              <th className="px-4 py-3 font-medium">Kamyon</th>
              <th className="px-4 py-3 font-medium">Not</th>
              <th className="px-4 py-3 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-white/50">
                  Yükleniyor...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-white/50">
                  Kayıt bulunamadı.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border/60 last:border-0"
                >
                  <td className="px-4 py-4 font-medium text-white">
                    {item.shipName}
                  </td>
                  <td className="px-4 py-4 text-white/80">
                    {formatTon(item.targetTon)}
                  </td>
                  <td className="px-4 py-4 text-white/80">
                    {formatTon(item.totalTon)}
                  </td>
                  <td className="px-4 py-4 text-white/80">
                    {formatTon(item.remainingTon)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-accent-light"
                          style={{ width: `${Math.min(item.progress, 100)}%` }}
                        />
                      </div>
                      <span className="text-white/80">
                        %{item.progress.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-white/80">{item.truckCount}</td>
                  <td className="max-w-[160px] truncate px-4 py-4 text-white/60">
                    {item.note || "—"}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button variant="ghost" onClick={() => openBeyannameEdit(item)}>
                        Beyanname Düzenle
                      </Button>
                      <Button variant="ghost" onClick={() => openEdit(item)}>
                        Düzenle
                      </Button>
                      <Button variant="danger" onClick={() => openDelete(item)}>
                        Sil
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        title={editing ? "Gemi Güncelle" : "Gemi Oluştur"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-white/80">Gemi Adı</label>
            <input
              required
              value={form.shipName}
              onChange={(e) => setForm({ ...form, shipName: e.target.value })}
              className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-white outline-none focus:border-accent-light"
              placeholder="Örn: Folluks"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/80">Hedef Ton</label>
            <input
              required
              type="number"
              min={0}
              step={0.01}
              value={form.targetTon || ""}
              onChange={(e) =>
                setForm({ ...form, targetTon: Number(e.target.value) })
              }
              className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-white outline-none focus:border-accent-light"
              placeholder="Örn: 7600"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/80">Not</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-white outline-none focus:border-accent-light"
              placeholder="Örn: Haziran sevkiyatı"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setModalOpen(false)}
            >
              İptal
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </form>
      </Modal>

      <BeyannameEditModal
        open={beyannameModalOpen}
        ship={beyannameShip}
        onClose={() => {
          setBeyannameModalOpen(false);
          setBeyannameShip(null);
        }}
        onUpdated={load}
      />

      <Modal
        open={deleteModalOpen}
        title="Gemi Sil"
        onClose={closeDeleteModal}
      >
        <form onSubmit={handleDeleteConfirm} className="space-y-4">
          <p className="text-sm text-white/70">
            <span className="font-medium text-white">{deleting?.shipName}</span>{" "}
            gemisini silmek üzeresiniz. Bu işlem geri alınamaz.
          </p>
          <div>
            <label className="mb-1.5 block text-sm text-white/80">
              Onay Şifresi
            </label>
            <input
              required
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-white outline-none focus:border-red-400"
              placeholder="Onay şifresini girin"
              autoComplete="off"
            />
          </div>
          {deleteError && (
            <p className="text-sm text-red-400">{deleteError}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={closeDeleteModal}
              disabled={deletingInProgress}
            >
              İptal
            </Button>
            <Button type="submit" variant="danger" disabled={deletingInProgress}>
              {deletingInProgress ? "Siliniyor..." : "Gemi Sil"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
