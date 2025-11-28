import { api } from "./axiosClient";
import { getPersonResponse } from "@/app/api/models/person.types";

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