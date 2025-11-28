"use client";

import { useState } from "react";
import { PersonDetail, Person } from "@/app/api/models/person.types";
import { validateNIT } from "@/app/utils/validateNIT";
import { DetailModal } from "@/app/byte/person/create/DetailModal";
import { DetailTable } from "@/app/byte/person/create/DetailTable";

type Mode = "create" | "edit" | "view";

interface Props {
  mode: Mode;
  initialData?: Person & { details: PersonDetail[] };
  onSubmit: (data: {
    NIT?: string;
    Name: string;
    Address: string;
    Phone_Number: string;
    details: PersonDetail[];
  }) => void;
}

export function PersonForm({ mode, initialData, onSubmit }: Props) {
  const isEdit = mode === "edit";
  const isView = mode === "view";

  const [nit, setNit] = useState(initialData?.NIT ?? "");
  const [id] = useState(initialData?.ID ?? undefined);

  const [name, setName] = useState(initialData?.Name ?? "");
  const [address, setAddress] = useState(initialData?.Address ?? "");
  const [phone, setPhone] = useState(initialData?.Phone_Number ?? "");

  const [details, setDetails] = useState<PersonDetail[]>(
    initialData?.details ?? []
  );

  const [modalOpen, setModalOpen] = useState(false);

  const [error, setError] = useState("");

  const handleSave = () => {
    setError("");

    if (!name || !address || !phone) {
      setError("Todos los campos obligatorios deben completarse.");
      return;
    }

    if (mode === "create") {
      const nitValidation = validateNIT(nit);
      if (!nitValidation.valid) {
        setError(nitValidation.reason || "NIT inválido");
        return;
      }
    }

    if (details.length === 0) {
      setError("Debe agregar al menos un detalle.");
      return;
    }

    onSubmit({
      ...(mode === "create" ? { NIT: nit } : {}),
      Name: name,
      Address: address,
      Phone_Number: phone,
      details,
    });
  };

  const handleAddDetail = (detail: PersonDetail) => {
    if (isEdit) return; // en edit no se modifica detalle según requerimiento
    setDetails([...details, detail]);
  };

  const handleDeleteDetail = (index: number) => {
    if (isEdit) return;
    setDetails(details.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {error && <div className="text-red-600 dark:text-red-400">{error}</div>}

      {/* ID solo en modo editar/ver */}
      {(isEdit || isView) && (
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            ID
          </label>
          <input
            value={id}
            disabled
            className="w-full border px-3 py-2 rounded 
                      bg-gray-100 dark:bg-gray-700 
                      border-gray-300 dark:border-gray-600 
                      text-gray-800 dark:text-gray-200"
          />
        </div>
      )}

      {/* NIT */}
      <div>
        <label className="block mb-1 text-gray-700 dark:text-gray-300">
          NIT
        </label>
        <input
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          disabled={isEdit || isView}
          className="w-full border px-3 py-2 rounded 
                    bg-white dark:bg-gray-800 
                    border-gray-300 dark:border-gray-600 
                    text-gray-800 dark:text-gray-200 
                    disabled:bg-gray-100 disabled:dark:bg-gray-700"
        />
      </div>

      {/* Nombre */}
      <div>
        <label className="block mb-1 text-gray-700 dark:text-gray-300">
          Nombre
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isView}
          className="w-full border px-3 py-2 rounded 
                    bg-white dark:bg-gray-800 
                    border-gray-300 dark:border-gray-600 
                    text-gray-800 dark:text-gray-200
                    disabled:bg-gray-100 disabled:dark:bg-gray-700"
        />
      </div>

      {/* Dirección */}
      <div>
        <label className="block mb-1 text-gray-700 dark:text-gray-300">
          Dirección
        </label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isView}
          className="w-full border px-3 py-2 rounded 
                    bg-white dark:bg-gray-800 
                    border-gray-300 dark:border-gray-600 
                    text-gray-800 dark:text-gray-200
                    disabled:bg-gray-100 disabled:dark:bg-gray-700"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="block mb-1 text-gray-700 dark:text-gray-300">
          Teléfono
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isView}
          className="w-full border px-3 py-2 rounded 
                    bg-white dark:bg-gray-800 
                    border-gray-300 dark:border-gray-600 
                    text-gray-800 dark:text-gray-200
                    disabled:bg-gray-100 disabled:dark:bg-gray-700"
        />
      </div>

      {/* DETALLES */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg text-gray-700 dark:text-gray-200">
          Detalles
        </h2>

        {!isEdit && !isView && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-green-600 dark:bg-green-700 
                       text-white rounded hover:bg-green-700 dark:hover:bg-green-800"
          >
            Agregar Detalle
          </button>
        )}
      </div>

      <DetailTable
        details={details}
        onDelete={handleDeleteDetail}
        readOnly={isEdit || isView}
      />

      {!isView && (
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 dark:bg-blue-700 
                     text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800"
        >
          Guardar
        </button>
      )}

      <DetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleAddDetail}
      />
    </div>
  );
}
