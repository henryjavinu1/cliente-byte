"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Person, getPersonResponse } from "@/app/api/models/person.types";
import { getPersons } from "@/app/api/services/person.services";
import { PersonTable } from "@/components/PersonTable";
import { Pagination } from "@/components/Pagination";
import { deletePerson } from "@/app/api/services/person.services";
import { ConfirmModal } from "@/components/ConfirmModal";

type SortField = "ID" | "Name";
type SortOrder = "asc" | "desc";

const PAGE_SIZE = 5;

export default function PersonListPage() {
  const router = useRouter();

  const [persons, setPersons] = useState<Person[]>([]);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"id" | "name">("name");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(id);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPersons(
        page,
        PAGE_SIZE,
        sortBy,
        sortOrder,
        debouncedSearch
      );
      setPersons(response.data);
      setTotal(response.total);
    };

    fetchData();
  }, [page, sortBy, sortOrder, debouncedSearch]);

  const handleSortChange = (field: "id" | "name") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setSortOrder("ASC");
    }
  };

  const handleView = (person: Person) => {
    router.push(`/byte/person/visualize?id=${person.ID}`);
  };

  const handleEdit = (person: Person) => {
    router.push(`/byte/person/edit?id=${person.ID}`);
  };

  const handleDelete = (person: Person) => {
    setSelectedPerson(person);
    setDeleteModalOpen(true);
  };

  const handleNew = () => {
    router.push("/byte/person/create");
  };

  const confirmDelete = async () => {
  if (!selectedPerson) return;

  try {
    await deletePerson(selectedPerson.ID);

    // recargar tabla
    const response = await getPersons(page, PAGE_SIZE, sortBy, sortOrder, debouncedSearch);
    setPersons(response.data);
    setTotal(response.total);

  } catch (err) {
    console.error("Error eliminando", err);
  }

  setDeleteModalOpen(false);
  setSelectedPerson(null);
};


  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Personas</h1>
        <button
          onClick={handleNew}
          className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Nuevo
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            Buscar por nombre
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Escribe un nombre..."
          />
        </div>
      </div>

      {loading && <div className="text-sm text-gray-500">Cargando...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      <PersonTable
        data={persons}
        sortField={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={page}
        totalItems={total}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />

      <ConfirmModal
        open={deleteModalOpen}
        title="Eliminar Persona"
        message={`¿Deseas eliminar a ${selectedPerson?.Name}?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}
