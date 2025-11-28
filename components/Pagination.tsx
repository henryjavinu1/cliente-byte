"use client";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between mt-4 text-sm">
      <div>
        Página {currentPage} de {totalPages} — {totalItems} registros
      </div>

      <div className="space-x-2 flex items-center">
        {/* PRIMERO */}
        <button
          disabled={!canPrev}
          onClick={() => onPageChange(1)}
          className={`px-3 py-1 border rounded ${
            !canPrev ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          ⏮ Primero
        </button>

        {/* ANTERIOR */}
        <button
          disabled={!canPrev}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-3 py-1 border rounded ${
            !canPrev ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          ◀ Anterior
        </button>

        {/* SIGUIENTE */}
        <button
          disabled={!canNext}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-3 py-1 border rounded ${
            !canNext ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          Siguiente ▶
        </button>

        {/* ÚLTIMO */}
        <button
          disabled={!canNext}
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1 border rounded ${
            !canNext ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          Último ⏭
        </button>
      </div>
    </div>
  );
}
