import { api } from "./axiosClient";
import { getPersonResponse } from "@/app/api/models/person.types";
import { PayloadCreatePerson, Person, PersonWithDetails, UpdatePersonDto } from "@/app/api/models/person.types";

const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:3000/api";

export const getPersons = async (
  page: number,
  limit: number,
  sortBy: "id" | "name",
  sortOrder: "ASC" | "DESC",
  name?: string
): Promise<getPersonResponse> => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy,
    sortOrder,
  });

  if (name && name.trim() !== "") {
    query.set("name", name);
  }

  const response = await api.get<getPersonResponse>(`${BASE_API_URL}/persons?${query.toString()}`);
  return response.data;
};

export const createPerson = async (
  payload: PayloadCreatePerson
): Promise<Person> => {
  const response = await api.post<Person>(`${BASE_API_URL}/persons`, payload);
  return response.data;
};

export const getPersonById = async (id: number): Promise<PersonWithDetails> => {
  const response = await api.get<PersonWithDetails>(`${BASE_API_URL}/persons/${id}`);
  return response.data;
};

export const updatePerson = async (
  id: number,
  payload: UpdatePersonDto
): Promise<PersonWithDetails> => {
  const response = await api.put<PersonWithDetails>(`${BASE_API_URL}/persons/${id}`, payload);
  return response.data;
};

export const deletePerson = async (id: number): Promise<{ deleted: true }> => {
  const response = await api.delete<{ deleted: true }>(
    `${BASE_API_URL}/persons/${id}`
  );
  return response.data;
};
