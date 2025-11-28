"use client";

import { PersonDetail } from "@/app/api/models/person.types";

interface Props {
  details: PersonDetail[];
  onDelete: (index: number) => void;
}

export function DetailTable({ details, onDelete }: Props) {
  return (
    <table className="min-w-full border text-sm">
      <thead className="bg-green-800">
        <tr>
          <th className="px-3 py-2 text-left">Tipo</th>
          <th className="px-3 py-2 text-left">Organización</th>
          <th className="px-3 py-2 text-left">Credencial</th>
          <th className="px-3 py-2 text-left">Año</th>
          <th className="px-3 py-2 text-center">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {details.length === 0 && (
          <tr>
            <td colSpan={5} className="px-3 py-3 text-center text-gray-500">
              No hay detalles agregados.
            </td>
          </tr>
        )}

        {details.map((det, idx) => (
          <tr key={idx} className="border-t">
            <td className="px-3 py-2">{det.Type}</td>
            <td className="px-3 py-2">{det.Organization}</td>
            <td className="px-3 py-2">{det.Acquired_credential}</td>
            <td className="px-3 py-2">{det.Year}</td>
            <td className="px-3 py-2 text-center">
              <button
                className="text-red-600 hover:underline"
                onClick={() => onDelete(idx)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
