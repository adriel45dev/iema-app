"use client";
import React, { useEffect, useState } from "react";
import TableIndividual from "./components/TableIndividual";
import Select from "../components/Select";
import { ProfessorType } from "@/app/shared/type";
import { DATA_DEF } from "@/app/constants";

const DATA_ATRIBUICAOES = [
  { name: "T.P.M", id: "tpm" },
  { name: "AVALIAÇÃO", id: "att1" },
  { name: "TUTORIA", id: "att2" },
  { name: "ELETIVA", id: "att3" },
];

export default function Individual() {
  const [professores, setProfessores] = useState<ProfessorType[]>([]);
  const [professor, setTeacher] = useState({ name: "", id: "-1" });
  const [atribuicao, setAtribuicao] = useState({ name: "", id: "-1" });
  const [remover, setRemover] = useState(false);

  useEffect(() => {
    const dataJSON = localStorage.getItem(DATA_DEF.dataProfessores);

    if (dataJSON) {
      try {
        const data = JSON.parse(dataJSON);
        setProfessores(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        // Handle the error, e.g., setProfessores to a default value or show an error message.
      }
    }
  }, []);
  return (
    <div className="flex min-h-screen w-full  flex-col items-center p-4 pb-16">
      <div className="flex items-center justify-center gap-2 p-4 text-2xl ">
        <span className="font-bold">HORÁRIO INDIVIDUAL</span>
        <span className="text-lg"> | {professor.name}</span>
      </div>

      <div className="flex w-full gap-2 py-2">
        <Select
          title="Professor"
          data={professores}
          dataSelected={professor}
          setDataSelected={setTeacher}
          disabled={false}
        />

        <Select
          title="ATRIBUIÇÃO"
          data={DATA_ATRIBUICAOES}
          dataSelected={atribuicao}
          setDataSelected={setAtribuicao}
          disabled={false}
        />
      </div>

      <div className="flex w-full justify-end py-2">
        <label className="relative me-5 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={remover}
            onChange={() => setRemover((prev) => !prev)}
          />
          <div className="0 peer h-6 w-11 rounded-full border-gray-600 bg-gray-700 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full  peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-800 rtl:peer-checked:after:-translate-x-full"></div>
          <span className="ms-3 text-xs font-medium uppercase text-gray-900 ">
            Remover Atribuição
          </span>
        </label>
      </div>
      <TableIndividual
        selectedProfessor={professor}
        atribuicao={atribuicao}
        remover={remover}
        professores={professores}
      />
    </div>
  );
}
