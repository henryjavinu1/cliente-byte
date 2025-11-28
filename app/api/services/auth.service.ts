import { api } from "./axiosClient";

export async function refreshToken() {
  try {
    const { data } = await api.post("/auth/refresh", {
      refreshToken:
        typeof window !== "undefined"
          ? localStorage.getItem("refreshToken")
          : null,
    });

    return data.token;
  } catch (err) {
    throw err;
  }
}
