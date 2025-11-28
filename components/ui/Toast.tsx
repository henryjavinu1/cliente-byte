"use client";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
}

export function Toast({ message, type = "info" }: ToastProps) {
  const base =
    "fixed bottom-4 right-4 px-4 py-2 rounded shadow text-sm text-white";

  const typeClass =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-800";

  return <div className={`${base} ${typeClass}`}>{message}</div>;
}
