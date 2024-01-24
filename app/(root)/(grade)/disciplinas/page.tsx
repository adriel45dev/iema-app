"use client";

import { AddCircleIcon, EditIcon, TrashIcon } from "@/public/assets/icons";
import React, { useEffect, useState } from "react";
import Alert from "../components/Alert";
import { DisciplinasType, ProfessorType } from "@/app/shared/type";
import { DATA_DEF } from "@/app/constants";

import {
  AlertDefaultData,
  AlertType,
  AlertTypeData,
} from "../components/Alert";

export default function Disciplinas() {
  const [disciplinas, setDisciplinas] = useState<DisciplinasType[]>([]);
  const [professores, setProfessores] = useState<ProfessorType[]>([]);
  const [selectedProfessores, setSelectedProfessores] = useState<
    ProfessorType[]
  >([]);

  const [alertAction, setAlertAction] =
    useState<AlertTypeData>(AlertDefaultData);
  const [inputSelectedProfessor, setInputSelectedProfessor] = useState("-1");
  const [inputDisciplina, setInputDisciplina] = useState("");
  const [id, setId] = useState(String(Date.now()));

  useEffect(() => {
    const dataJSON = localStorage.getItem(DATA_DEF.dataDisciplinas);

    if (dataJSON) {
      try {
        const data = JSON.parse(dataJSON);
        setDisciplinas(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  useEffect(() => {
    const dataJSON = localStorage.getItem(DATA_DEF.dataProfessores);

    if (dataJSON) {
      try {
        const data = JSON.parse(dataJSON);
        setProfessores(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (disciplinas.length > 0) {
      const dataJSON = JSON.stringify(disciplinas);
      localStorage.setItem(DATA_DEF.dataDisciplinas, dataJSON);
    } else {
      localStorage.removeItem(DATA_DEF.dataDisciplinas);
    }
  }, [disciplinas]);

  const handleInputDisciplina = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputDisciplina(value.toUpperCase());
    setAlertAction({ ...alertAction, state: false });
  };

  const handleAddDisciplina = () => {
    if (!inputDisciplina) {
      return setAlertAction({
        message: "Insira o nome da disciplina",
        type: AlertType.info,
        state: true,
      });
    }

    if (disciplinas?.map((p) => p.name).includes(inputDisciplina)) {
      return setAlertAction({
        message: "Já existe um disciplina com esse mesmo nome.",
        type: AlertType.warning,
        state: true,
      });
    }

    const dataDisciplina = {
      name: inputDisciplina,
      id: String(Date.now()),
      professores: selectedProfessores,
    };

    setDisciplinas((prev) => [...prev, dataDisciplina]);
    setInputDisciplina("");
    setSelectedProfessores([]);
    setId(String(Date.now()));
  };

  const removeDisciplina = (id: string) => {
    const newDisciplina = disciplinas.filter((p) => p.id != id);
    setDisciplinas(newDisciplina);
  };

  const handleRelacionarProfessor = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e.target;

    setInputSelectedProfessor(value);

    if (value == "-1") return;

    if (selectedProfessores.map((p) => p.id).includes(value)) return;

    setSelectedProfessores([
      ...selectedProfessores,
      {
        name: e.target.options[e.target.selectedIndex].text,
        id: value,
      },
    ]);

    setInputSelectedProfessor("-1");
  };

  const handleRemoverProfessorRelacao = (id: string) => {
    const newSelectedProfessores = selectedProfessores.filter(
      (p) => p.id != id,
    );
    setSelectedProfessores(newSelectedProfessores);
  };

  const [editAction, setEditAction] = useState(false);
  const [editDataSelectedDisciplina, setEditDataSelectedProfessor] =
    useState<DisciplinasType>();

  const initEditDisciplina = (data: DisciplinasType) => {
    setEditAction(true);
    setEditDataSelectedProfessor(data);
    setInputDisciplina(data.name);
    setId(data.id);
    if (data.professores) setSelectedProfessores(data.professores);
  };

  const handleUpdateDisciplina = () => {
    if (!editDataSelectedDisciplina) return;

    if (editDataSelectedDisciplina.name != inputDisciplina) {
      if (disciplinas?.map((p) => p.name).includes(inputDisciplina)) {
        return alert("Já existe um disciplina com esse mesmo nome.");
      }
    }

    removeDisciplina(editDataSelectedDisciplina.id);

    const dataDisciplina = {
      name: inputDisciplina,
      id: editDataSelectedDisciplina.id,
      professores: selectedProfessores,
    };

    setDisciplinas((prev) => [...prev, dataDisciplina]);
    setInputDisciplina("");
    setSelectedProfessores([]);
    setId(String(Date.now()));
    setEditAction(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 px-4 pb-16">
      <div className="p-4 text-2xl font-bold">CADASTRO DISCIPLINAS</div>

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
                placeholder="Disciplina"
                required
                onChange={(e) => handleInputDisciplina(e)}
                value={inputDisciplina}
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

          {inputDisciplina.length > 16 && (
            <p className="text-xs font-bold text-orange-600">
              * opte por abreviar disciplinas com nomes muito extensos.
            </p>
          )}

          <div className="flex w-full flex-col">
            <div className="mb-2 block text-sm font-medium text-gray-900 ">
              Relacionar Professor
            </div>

            <ul className="w-full">
              {selectedProfessores.map((p) => (
                <li
                  key={p.id}
                  className="mb-2 flex w-full items-center justify-between gap-2 rounded-2xl bg-gray-300 p-2"
                >
                  <div className="flex w-full items-center justify-center gap-2">
                    <AddCircleIcon className="h-8 w-8 text-green-800" />
                    <div className="w-full text-sm">{p.name}</div>
                  </div>
                  <TrashIcon
                    className="h-6 w-6 text-red-800"
                    onClick={() => handleRemoverProfessorRelacao(p.id)}
                  />
                </li>
              ))}
            </ul>

            <div className="mb-4 flex items-center justify-center gap-2 p-2">
              <AddCircleIcon className="h-8 w-8 text-cyan-800" />

              <select
                id="underline_select"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-700 bg-transparent px-0 py-2.5  text-sm text-gray-800 focus:border-gray-200 focus:outline-none focus:ring-0"
                value={inputSelectedProfessor}
                onChange={(e) => {
                  handleRelacionarProfessor(e);
                }}
              >
                <option value={"-1"}>Professor</option>

                {professores.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <button
              type="button"
              className="w-max rounded-lg  bg-cyan-800 px-4 py-1 text-center text-sm font-medium  text-white hover:bg-cyan-700  focus:outline-none focus:ring-4 focus:ring-cyan-900"
            >
              Adicionar Professor
            </button> */}
          </div>

          {editAction ? (
            <button
              type="button"
              className="rounded-lg  bg-green-800 px-5 py-2.5 text-center text-sm font-medium  text-white hover:bg-green-700  focus:outline-none focus:ring-4 focus:ring-cyan-900"
              onClick={handleUpdateDisciplina}
            >
              Salvar
            </button>
          ) : (
            <button
              type="button"
              className="rounded-lg  bg-cyan-800 px-5 py-2.5 text-center text-sm font-medium  text-white hover:bg-cyan-700  focus:outline-none focus:ring-4 focus:ring-cyan-900"
              onClick={handleAddDisciplina}
            >
              Adicionar
            </button>
          )}
        </form>
      </div>

      {disciplinas.length > 0 && (
        <div className=" w-full  rounded-2xl bg-gray-200 px-6 py-4">
          <ul className="flex w-full flex-col gap-2 ">
            {/* HEADER */}
            <li className="flex justify-between  p-2">
              <div className="text-sm font-bold">Nome</div>
              <div className="text-sm font-bold">Professores</div>
              <div className="text-sm font-bold">Ações</div>
            </li>

            {disciplinas.map((d) => (
              <li
                key={d.id}
                className="flex justify-between rounded-2xl px-4 py-2 odd:bg-gray-300 even:bg-gray-400 hover:bg-indigo-400"
              >
                <div className="w-full">{d.name}</div>
                <div className="flex w-full items-center justify-start gap-2 ">
                  {d.professores?.map((p) => (
                    <span className="rounded-2xl bg-cyan-800 px-2 py-1 text-xs text-white">
                      {p.name}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <EditIcon
                    className="h-7 w-7 text-slate-800 hover:scale-110"
                    onClick={() => initEditDisciplina(d)}
                  />

                  <TrashIcon
                    className="h-6 w-6 text-cyan-800 hover:scale-110"
                    onClick={() => removeDisciplina(d.id)}
                  />
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
