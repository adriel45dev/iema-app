import { BackIcon } from "@/public/assets/icons";
import React from "react";
import { ProfessorType } from "@/app/shared/type";

type TablePreViewProps = {
  professores: ProfessorType[];
  title: string;
  setShowProfessoresPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfessoresPreView({
  professores,
  title,
  setShowProfessoresPreview,
}: TablePreViewProps) {
  return (
    <div className="absolute z-50 flex min-h-full w-screen flex-col items-center rounded-lg bg-white p-8 ">
      <button
        onClick={() => setShowProfessoresPreview(false)}
        className="flex w-full justify-start focus:ring-gray-700"
      >
        <BackIcon className="h-10 w-10 text-slate-600 hover:scale-105 hover:text-blue-600" />
      </button>
      <h1 className="text-lg font-bold uppercase">
        Professores Preview - {title}
      </h1>

      <div className="flex w-full flex-col p-4 text-center">
        <table className="border">
          <tr className="border">
            <th className="p-4 font-bold">NOME</th>
            <th className="p-4 font-bold">ID</th>
          </tr>
          {professores?.map((p, i) => (
            <tr key={i} className="border ">
              <td className="border-r p-4">{p.name}</td> <td>{p.id}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
