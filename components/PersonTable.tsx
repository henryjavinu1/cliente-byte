"use client";

import { Person } from "@/app/api/models/person.types";

type SortField = "id" | "name"; // API real
type SortOrder = "ASC" | "DESC";

interface PersonTableProps {
  data: Person[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField) => void;
  onView: (person: Person) => void;
  onEdit: (person: Person) => void;
  onDelete: (person: Person) => void;
}

export function PersonTable({
  data,
  sortField,
  sortOrder,
  onSortChange,
  onView,
  onEdit,
  onDelete,
}: PersonTableProps) {
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === "ASC" ? " ▲" : " ▼";
  };

  return (
    <table className="min-w-full border border-gray-200 rounded-md text-sm">
      <thead className="bg-green-800">
        <tr>
          <th
            className="px-4 py-2 text-left cursor-pointer select-none"
           onClick={() => onSortChange("id")}
          >
            ID{renderSortIndicator("id")}
          </th>

          <th
            className="px-4 py-2 text-left cursor-pointer select-none"
            onClick={() => onSortChange("name")}
          >
            Nombre{renderSortIndicator("name")}
          </th>

          <th className="px-4 py-2 text-left">NIT</th>
          <th className="px-4 py-2 text-left">Dirección</th>
          <th className="px-4 py-2 text-left">Teléfono</th>
          <th className="px-4 py-2 text-center">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
              No hay registros para mostrar.
            </td>
          </tr>
        )}

        {data.map((person) => (
          <tr key={person.ID} className="border-t border-gray-200">
            <td className="px-4 py-2">{person.ID}</td>
            <td className="px-4 py-2">{person.Name}</td>
            <td className="px-4 py-2">{person.NIT}</td>
            <td className="px-4 py-2">{person.Address}</td>
            <td className="px-4 py-2">{person.Phone_Number}</td>

            <td className="px-4 py-2 text-center space-x-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => onView(person)}
              >
                Ver
              </button>
              <button
                className="text-green-600 hover:underline"
                onClick={() => onEdit(person)}
              >
                Editar
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => onDelete(person)}
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
