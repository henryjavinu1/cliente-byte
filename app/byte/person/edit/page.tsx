"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getPersonById, updatePerson } from "@/app/api/services/person.services";
import { PersonForm } from "@/components/PersonForm";
import { PersonDetail, Person } from "@/app/api/models/person.types";

export default function EditPersonPage() {
  const router = useRouter();
  const params = useSearchParams();

  // obtener ?id=123
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

  const handleUpdate = async (formData: {
    Name: string;
    Address: string;
    Phone_Number: string;
    details: PersonDetail[];
  }) => {
    await updatePerson(id, {
      Name: formData.Name,
      Address: formData.Address,
      Phone_Number: formData.Phone_Number
      // NOTA: details NO SE EDITAN EN ESTE requerimiento
    });

    router.push("/byte/person");
  };

  if (!person) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Editar Persona</h1>

      <PersonForm
        mode="edit"
        initialData={{ ...person, details }}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
