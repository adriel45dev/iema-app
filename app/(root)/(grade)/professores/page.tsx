"use client";

import { TrashIcon } from "@/public/assets/icons";
import React, { useEffect, useState } from "react";
import Alert from "../components/Alert";
import { DATA_DEF } from "@/app/constants";

import {
  AlertDefaultData,
  AlertType,
  AlertTypeData,
} from "../components/Alert";

import { ProfessorType } from "@/app/shared/type";

export default function Professores() {
  const [alertAction, setAlertAction] =
    useState<AlertTypeData>(AlertDefaultData);
  const [professores, setProfessores] = useState<ProfessorType[]>([]);
  const [inputProfessor, setInputProfessor] = useState("");
  const [id, setId] = useState(String(Date.now()));

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
    if (professores.length) {
      const dataJSON = JSON.stringify(professores);
      localStorage.setItem(DATA_DEF.dataProfessores, dataJSON);
    } else {
      localStorage.removeItem(DATA_DEF.dataProfessores);
    }
  }, [professores]);

  const handleInputProfessor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputProfessor(value.toUpperCase());
    setAlertAction({ ...alertAction, state: false });
  };

  const handleAddProfessor = () => {
    if (!inputProfessor) {
      return setAlertAction({
        message: "Insira o nome do professor.",
        type: AlertType.info,
        state: true,
      });
    }

    if (professores?.map((p) => p.name).includes(inputProfessor)) {
      return setAlertAction({
        message: "Já existe um professor com esse mesmo nome.",
        type: AlertType.warning,
        state: true,
      });
    }

    const dataProfessor = {
      name: inputProfessor,
      id: String(Date.now()),
    };

    setProfessores((prev) => [...prev, dataProfessor]);
    setInputProfessor("");
    setId(String(Date.now()));
  };

  const removeProfessor = (id: string) => {
    const newProfessores = professores.filter((p) => p.id != id);
    setProfessores(newProfessores);
    /***
     * 1 - Buscar as disciplas
     * 1. Se houver filtrar / remover os professores relacioandos
     ***/
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 px-4 pb-16">
      <div className="p-4 text-2xl font-bold">CADASTRO PROFESSORES</div>

      <Alert setAlertAction={setAlertAction} alertAction={alertAction}></Alert>

      <div className="w-full rounded-2xl bg-gray-200 px-6 py-4">
        <form className="mx-auto flex w-full flex-col gap-4">
          <div className="flex gap-2">
            <div className=" w-full">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm uppercase text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 "
                placeholder="Professor"
                required
                onChange={(e) => handleInputProfessor(e)}
                value={inputProfessor}
              />
            </div>

            <div className=" w-max">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                ID
              </label>
              <input
                type="text"
                id="name"
                className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 "
                value={id}
                readOnly
                disabled
              />
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg  bg-cyan-800 px-5 py-2.5 text-center text-sm font-medium  text-white hover:bg-cyan-700  focus:outline-none focus:ring-4 focus:ring-cyan-900"
            onClick={handleAddProfessor}
          >
            Adicionar
          </button>
        </form>
      </div>

      {professores.length > 0 && (
        <div className=" w-full  rounded-2xl bg-gray-200 px-6 py-4">
          <ul className="flex w-full flex-col gap-2 ">
            {/* HEADER */}
            <li className="flex justify-between  p-2">
              <div className="text-sm font-bold">Nome</div>
              <div className="text-sm font-bold">Ações</div>
            </li>

            {professores.map((p) => (
              <li
                key={p.id}
                className="flex justify-between rounded-2xl px-4 py-2 odd:bg-gray-300 even:bg-gray-400"
              >
                <div>{p.name}</div>
                <div className="flex gap-2">
                  {p.id != "0" && (
                    <TrashIcon
                      className="h-6 w-6 text-cyan-800 hover:scale-110"
                      onClick={() => removeProfessor(p.id)}
                    />
                  )}
                  {/* <ClipboardIcon className="h-6 w-6 text-slate-800 hover:scale-110" /> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
