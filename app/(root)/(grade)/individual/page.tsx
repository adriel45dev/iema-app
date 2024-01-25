"use client";
import React, { useEffect, useState } from "react";
import TableIndividual from "./components/TableIndividual";
import Select from "../components/Select";
import { ProfessorType } from "@/app/shared/type";
import { DATA_DEF } from "@/app/constants";

export default function Individual() {
  const [professores, setProfessores] = useState<ProfessorType[]>([]);
  const [professor, setTeacher] = useState({ name: "", id: "-1" });
  const [atribuicao, setAtribuicao] = useState({ name: "", id: "-1" });

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
          data={[{ name: "T.P.M", id: "tpm" }]}
          dataSelected={atribuicao}
          setDataSelected={setAtribuicao}
          disabled={false}
        />
      </div>
      <TableIndividual PROFESSOR_ID={professor.id} />
    </div>
  );
}
