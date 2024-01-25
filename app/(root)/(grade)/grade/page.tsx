"use client";

import React, { useEffect, useState } from "react";
import Select from "../components/Select";
import TableView from "../components/TableView";
import { DATA_DEF, DATA_DISCIPLINAS, TURMAS } from "@/app/constants";
import { ProfessorType, DisciplinasType } from "@/app/shared/type";

export default function Grade() {
  const [professor, setTeacher] = useState({ name: "", id: "-1" });
  const [disciplina, setDisciplina] = useState({ name: "", id: "-1" });
  const [turma, setTurma] = useState({ name: "101", id: "101" });
  const [remover, setRemover] = useState(false);
  const [addToAll, setAddToAll] = useState(false);
  const [professores, setProfessores] = useState<ProfessorType[]>([]);
  const [disciplinas, setDisciplinas] = useState<DisciplinasType[]>([]);

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

  useEffect(() => {
    const dataJSON = localStorage.getItem(DATA_DEF.dataDisciplinas);

    if (dataJSON) {
      try {
        const data = JSON.parse(dataJSON);
        setDisciplinas(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        // Handle the error, e.g., setDisciplina to a default value or show an error message.
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center bg-white p-4 pb-8">
      <div>
        <h1 className="flex w-full flex-col flex-wrap items-center justify-center gap-2 text-center text-2xl font-bold uppercase sm:flex-row">
          <div className="text-sm sm:text-2xl">
            <span>Horário</span>{" "}
            <span className="hidden sm:inline-block">|</span>{" "}
          </div>
          <span className="text-sm sm:text-2xl">
            {TURMAS.find((c) => c.id == turma.id)?.title}
          </span>
          <span className="rounded-2xl border border-slate-600 px-4 py-1 text-xs font-bold text-blue-500">
            {turma.id}
          </span>
        </h1>
      </div>
      <div className="flex w-full gap-4 py-4">
        <Select
          title="Professor"
          data={professores}
          dataSelected={professor}
          setDataSelected={setTeacher}
          disabled={remover}
        />
        <Select
          title="Disciplina"
          data={disciplinas}
          dataSelected={disciplina}
          professorSelected={professor}
          setDataSelected={setDisciplina}
          disabled={remover}
        />
        <div className="min-w-max">
          <Select
            data={TURMAS}
            dataSelected={turma}
            setDataSelected={setTurma}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex w-full flex-col justify-between gap-2 pb-4 sm:flex-row">
        <label className="relative me-5 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={addToAll}
            className="peer sr-only"
            onChange={() => setAddToAll((prev) => !prev)}
            disabled={remover}
          />
          <div className="peer h-6 w-11 rounded-full border-gray-600 bg-gray-700 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-500 peer-checked:after:translate-x-full  peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-orange-800 rtl:peer-checked:after:-translate-x-full"></div>
          <span className="ms-3 text-xs  font-medium uppercase text-gray-900">
            Adicionar em todas as turmas
          </span>
        </label>
        <label className="relative me-5 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={remover}
            onChange={() => setRemover((prev) => !prev)}
            className="peer sr-only"
          />
          <div className="0 peer h-6 w-11 rounded-full border-gray-600 bg-gray-700 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full  peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-800 rtl:peer-checked:after:-translate-x-full"></div>
          <span className="ms-3 text-xs font-medium uppercase text-gray-900 ">
            Remover
          </span>
        </label>
      </div>

      <TableView
        turma={turma}
        remover={remover}
        professor={professor}
        disciplina={disciplina}
        addToAll={addToAll}
        classes={TURMAS}
      />

      <div className="flex w-full flex-col gap-2 p-4">
        <span className="mb-2 font-bold uppercase">Descrição:</span>

        <div className="flex w-max items-center justify-center gap-2 text-xs">
          <div className="h-4 w-4 rounded-sm border border-orange-600 bg-orange-500"></div>
          <span>INSTITUCIONAL</span>
        </div>
        <div className="flex w-max items-center justify-center gap-2 text-xs">
          <div className="h-4 w-4 rounded-sm border border-blue-600 bg-blue-400"></div>
          <span>T.P.M</span>
        </div>

        <div className="flex w-max items-center justify-center gap-2 text-xs">
          <div className="h-4 w-4 rounded-sm border border-gray-600 bg-gray-400"></div>
          <span>HORÁRIO ALOCADO</span>
        </div>

        <div className="flex w-max items-center justify-center gap-2 text-xs">
          <div className="h-4 w-4 rounded-sm border border-purple-600 bg-purple-400"></div>
          <span>ESTUDO ORIENTADO</span>
        </div>

        <div className="flex w-max items-center justify-center gap-2 text-xs">
          <div className="h-4 w-4 rounded-sm border border-yellow-600 bg-yellow-400"></div>
          <span>ATRIBUIÇÕES</span>
        </div>
      </div>
    </div>
  );
}
