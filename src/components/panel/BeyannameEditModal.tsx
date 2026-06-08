"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  addShipBeyanname,
  deleteShipBeyanname,
  getShipBeyannames,
  updateShipBeyannames,
} from "@/lib/api/gemi-beyanname";
import { Modal } from "@/components/panel/Modal";
import { Button } from "@/components/ui/Button";
import type { Gemi } from "@/types/gemi";

type BeyannameEditModalProps = {
  open: boolean;
  ship: Gemi | null;
  onClose: () => void;
  onUpdated: () => void;
};

export function BeyannameEditModal({
  open,
  ship,
  onClose,
  onUpdated,
}: BeyannameEditModalProps) {
  const [beyannames, setBeyannames] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [newBeyanname, setNewBeyanname] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!ship) return;

    try {
      setLoading(true);
      setError(null);
      setBeyannames(await getShipBeyannames(ship.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Beyannameler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, [ship]);

  useEffect(() => {
    if (open && ship) {
      setEditingIndex(null);
      setEditValue("");
      setNewBeyanname("");
      load();
    }
  }, [open, ship, load]);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!ship || !newBeyanname.trim()) return;

    setActionLoading(true);
    setError(null);

    try {
      const updated = await addShipBeyanname(ship.id, newBeyanname.trim());
      setBeyannames(updated.beyannames);
      setNewBeyanname("");
      onUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ekleme başarısız.");
    } finally {
      setActionLoading(false);
    }
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setEditValue(beyannames[index]);
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditValue("");
  }

  async function saveEdit() {
    if (!ship || editingIndex === null || !editValue.trim()) return;

    const updatedList = [...beyannames];
    updatedList[editingIndex] = editValue.trim();

    setActionLoading(true);
    setError(null);

    try {
      const updated = await updateShipBeyannames(ship.id, updatedList);
      setBeyannames(updated.beyannames);
      setEditingIndex(null);
      setEditValue("");
      onUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Güncelleme başarısız.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete(beyannameNo: string) {
    if (!ship) return;
    if (!confirm(`"${beyannameNo}" beyannamesini silmek istiyor musunuz?`)) return;

    setActionLoading(true);
    setError(null);

    try {
      await deleteShipBeyanname(ship.id, beyannameNo);
      setBeyannames((prev) => prev.filter((b) => b !== beyannameNo));
      onUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Silme başarısız.");
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      title={`Beyanname Düzenle — ${ship?.shipName ?? ""}`}
      onClose={onClose}
    >
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          value={newBeyanname}
          onChange={(e) => setNewBeyanname(e.target.value)}
          placeholder="Yeni beyanname no"
          className="flex-1 rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-white outline-none focus:border-accent-light"
        />
        <Button type="submit" disabled={actionLoading || !newBeyanname.trim()}>
          Ekle
        </Button>
      </form>

      {loading ? (
        <p className="py-6 text-center text-sm text-white/50">Yükleniyor...</p>
      ) : beyannames.length === 0 ? (
        <p className="py-6 text-center text-sm text-white/50">
          Beyanname bulunamadı.
        </p>
      ) : (
        <ul className="space-y-2">
          {beyannames.map((no, index) => (
            <li
              key={`${no}-${index}`}
              className="flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2"
            >
              {editingIndex === index ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-background/60 px-2 py-1.5 text-sm text-white outline-none focus:border-accent-light"
                  />
                  <Button
                    type="button"
                    onClick={saveEdit}
                    disabled={actionLoading}
                  >
                    Kaydet
                  </Button>
                  <Button type="button" variant="ghost" onClick={cancelEdit}>
                    İptal
                  </Button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm text-white">{no}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => startEdit(index)}
                    disabled={actionLoading}
                  >
                    Düzenle
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDelete(no)}
                    disabled={actionLoading}
                  >
                    Sil
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
