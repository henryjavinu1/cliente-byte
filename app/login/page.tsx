"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginKeycloak } from "@/app/api/services/keycloak.service";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      const data = await loginKeycloak(username, password);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      router.push("/byte/person");
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow w-96">
        <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Iniciar Sesión
        </h1>

        {error && <div className="text-red-500 mb-3">{error}</div>}

        <input
          type="text"
          placeholder="Usuario"
          className="w-full mb-3 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-3 p-2 border rounded  bg-white dark:bg-gray-700  text-gray-900 dark:text-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
