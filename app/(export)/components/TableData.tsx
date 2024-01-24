import React from "react";

type TableDataProps = {
  professores: { name: string; id: string }[];
  disciplina: { name: string; id: string };
};

export default function TableData({ professores, disciplina }: TableDataProps) {
  return (
    <div
      className={`flex h-14 min-w-full flex-col items-center justify-center border-b border-r border-slate-900 text-center text-xs sm:text-base ${
        professores?.map((p) => p.id).includes("0")
          ? "bg-orange-200"
          : "bg-white"
      } b`}
    >
      <span
        className={
          disciplina?.name.length > 16
            ? "-tracking-2 text-xs tracking-tighter	"
            : ""
        }
      >
        {disciplina && disciplina?.name}
      </span>

      {professores &&
        professores?.length != 0 &&
        !professores.map((p) => p.id).includes("0") && (
          <span className="hidden text-xs sm:inline-block sm:text-xs">
            (
            {professores?.length == 1
              ? professores[0].name
              : professores?.map((p) => p.name).join(", ")}
            )
          </span>
        )}
    </div>
  );
}
