"use client";

import { PersonDetail } from "@/app/api/models/person.types";

interface Props {
  details: PersonDetail[];
  onDelete?: (index: number) => void;
  readOnly?: boolean;
}

export function DetailTable({ details, onDelete, readOnly = false }: Props) {
  const showActions = !!onDelete && !readOnly;

  return (
    <table
      className="
        min-w-full 
        border 
        text-sm 
        border-gray-300 dark:border-gray-700
      "
    >
      <thead className="bg-green-800 dark:bg-green-900">
        <tr>
          <th className="px-3 py-2 text-left text-white">Tipo</th>
          <th className="px-3 py-2 text-left text-white">Organización</th>
          <th className="px-3 py-2 text-left text-white">Credencial</th>
          <th className="px-3 py-2 text-left text-white">Año</th>

          {showActions && (
            <th className="px-3 py-2 text-center text-white">Acciones</th>
          )}
        </tr>
      </thead>

      <tbody className="bg-white dark:bg-gray-800">
        {details.length === 0 && (
          <tr>
            <td
              colSpan={showActions ? 5 : 4}
              className="px-3 py-3 text-center text-gray-500 dark:text-gray-400"
            >
              No hay detalles agregados.
            </td>
          </tr>
        )}

        {details.map((det, idx) => (
          <tr
            key={idx}
            className="border-t border-gray-300 dark:border-gray-700"
          >
            <td className="px-3 py-2 text-gray-900 dark:text-gray-200">
              {det.Type}
            </td>
            <td className="px-3 py-2 text-gray-900 dark:text-gray-200">
              {det.Organization}
            </td>
            <td className="px-3 py-2 text-gray-900 dark:text-gray-200">
              {det.Acquired_credential}
            </td>
            <td className="px-3 py-2 text-gray-900 dark:text-gray-200">
              {det.Year}
            </td>

            {showActions && (
              <td className="px-3 py-2 text-center">
                <button
                  className="text-red-600 dark:text-red-400 hover:underline"
                  onClick={() => onDelete?.(idx)}
                >
                  Eliminar
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
