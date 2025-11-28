"use client";

import { useState } from "react";
import { PersonDetail } from "@/app/api/models/person.types";
import { Modal } from "@/components/ui/Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (detail: PersonDetail) => void;
}

export function DetailModal({ open, onClose, onConfirm }: Props) {
  const [type, setType] = useState<"GED" | "BACHELORS" | "MASTERS" | "PHD" | "CERTIFICATION">(
    "BACHELORS"
  );
  const [organization, setOrganization] = useState("");
  const [credential, setCredential] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [error, setError] = useState("");

  const handleSave = () => {
    setError("");

    if (!organization || !credential || !year) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const detail: PersonDetail = {
      Type: type,
      Organization: organization,
      Acquired_credential: credential,
      Year: Number(year),
    };

    onConfirm(detail);
    onClose();
  };

  return (
    <Modal open={open} title="Agregar Detalle" onClose={onClose}>
      <div className="space-y-3">

        {error && <div className="text-red-600">{error}</div>}

        <div>
          <label>Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full border px-2 py-1 rounded bg-white"
          >
            <option value="GED">GED</option>
            <option value="BACHELORS">BACHELORS</option>
            <option value="MASTERS">MASTERS</option>
            <option value="PHD">PHD</option>
            <option value="CERTIFICATION">CERTIFICATION</option>
          </select>
        </div>

        <div>
          <label>Organización</label>
          <input
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="w-full border px-2 py-1 rounded bg-white"
          />
        </div>

        <div>
          <label>Credencial</label>
          <input
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className="w-full border px-2 py-1 rounded bg-white"
          />
        </div>

        <div>
          <label>Año</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border px-2 py-1 rounded bg-white"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancelar
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
}
