"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PayloadCreatePerson,
  PersonDetail,
} from "@/app/api/models/person.types";
import { createPerson } from "@/app/api/services/person.services";
import { DetailModal } from "./DetailModal";
import { DetailTable } from "./DetailTable";
import { validateNIT } from "@/app/utils/validateNIT";

export default function CreatePersonPage() {
  const router = useRouter();

  const [nit, setNit] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [details, setDetails] = useState<PersonDetail[]>([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [error, setError] = useState("");

  const validateNitModulo11 = (nit: string): boolean => {
    const digits = nit.replace(/[^0-9]/g, "");

    let sum = 0;
    let multiplier = 2;

    for (let i = digits.length - 2; i >= 0; i--) {
      sum += Number(digits[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const remainder = sum % 11;
    const checkDigit = remainder <= 1 ? 0 : 11 - remainder;

    const lastDigit = Number(digits[digits.length - 1]);

    return checkDigit === lastDigit;
  };

  const handleSave = async () => {
    setError("");

    if (!nit || !name || !address || !phone) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$/.test(name)) {
      setError("El nombre solo puede contener letras del alfabeto español.");
      return;
    }

    const nitValidation = validateNIT(nit);
    if (!nitValidation.valid) {
      setError(nitValidation.reason || "El NIT no es válido.");
      return;
    }

    if (details.length === 0) {
      setError("Debe agregar al menos un detalle.");
      return;
    }

    const payload: PayloadCreatePerson = {
      NIT: nit,
      Name: name,
      Address: address,
      Phone_Number: phone,
      details: details,
    };

    try {
      await createPerson(payload);
      router.push("/byte/person");
    } catch (e: any) {
      console.error(e);
      setError("Error al crear persona.");
    }
  };

  const handleAddDetail = (detail: PersonDetail) => {
    setDetails([...details, detail]);
  };

  const handleDeleteDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Nueva Persona</h1>

      {error && <div className="text-red-600">{error}</div>}

      {/* FORM PADRE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>NIT</label>
          <input
            value={nit}
            onChange={(e) => setNit(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Dirección</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Teléfono</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* GRID DETALLES */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Detalles</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 text-sm bg-green-600 text-white rounded"
        >
          Agregar Detalle
        </button>
      </div>

      <DetailTable details={details} onDelete={handleDeleteDetail} />

      {/* BOTÓN CONFIRMAR */}
      <button
        onClick={handleSave}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Guardar
      </button>

      {/* MODAL */}
      <DetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleAddDetail}
      />
    </div>
  );
}
