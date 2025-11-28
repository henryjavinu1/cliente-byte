"use client";

import { useRouter } from "next/navigation";
import { createPerson } from "@/app/api/services/person.services";
import { PersonForm } from "@/components/PersonForm";
import { PayloadCreatePerson } from "@/app/api/models/person.types";

export default function CreatePersonPage() {
  const router = useRouter();

  const handleSubmit = async (data: PayloadCreatePerson) => {
    try {
      await createPerson(data);
      router.push("/byte/person");
    } catch (err) {
      console.error(err);
      alert("Error al crear persona.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold mb-4">Nueva Persona</h1>

      <PersonForm
        mode="create"
        onSubmit={(formData) => {
          const payload: PayloadCreatePerson = {
            NIT: formData.NIT!,
            Name: formData.Name,
            Address: formData.Address,
            Phone_Number: formData.Phone_Number,
            details: formData.details,
          };
          handleSubmit(payload);
        }}
      />
    </div>
  );
}
