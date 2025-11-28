"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPersonById } from "@/app/api/services/person.services";
import { PersonForm } from "@/components/PersonForm";
import { Person, PersonDetail } from "@/app/api/models/person.types";

export default function ViewPersonPage() {
  const router = useRouter();
  const params = useSearchParams();

  const id = Number(params.get("id"));

  const [person, setPerson] = useState<Person | null>(null);
  const [details, setDetails] = useState<PersonDetail[]>([]);

  useEffect(() => {
    if (id) {
      getPersonById(id).then((data) => {
        setPerson(data);
        setDetails(data.details || []);
      });
    }
  }, [id]);

  if (!person) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Ver Persona</h1>

      <PersonForm
        mode="view"
        initialData={{ ...person, details }}
        onSubmit={() => {}}
      />

      <button
        onClick={() => router.push("/byte/person")}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Volver
      </button>
    </div>
  );
}
