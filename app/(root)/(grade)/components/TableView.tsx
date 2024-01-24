"use client";
import React, { useEffect, useState } from "react";

import { AlertDefaultData, AlertType } from "./Alert";
import { AlertTypeData } from "./Alert";
import Alert from "./Alert";
import Link from "next/link";
import ExcelExportButton from "./ExcelExportButton";
import Button, { ButtonType } from "./Button";
import { GET_GRADE, INSTITUCIONAL_ID, SET_GRADE } from "@/app/constants";

import { DisciplinaType, GradeType, ProfessorType } from "@/app/shared/type";

import { GRADE_SCHEDULE_HEADDING } from "@/app/constants";

import {
  AddCircleIcon,
  EraseIcon,
  EyeIcon,
  PrintIcon,
  TrashIcon,
} from "@/public/assets/icons";

type TableDataProps = {
  children: React.ReactNode;
  ci: number;
  ri: number;
};

type TableProps = {
  turma: { name: string; id: string };
  remover: boolean;
  professor: { name: string; id: string };
  disciplina: { name: string; id: string };
  addToAll: boolean;
  classes: { name: string; id: string; title: string }[];
};

const TableHeadding = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="w-max border-b border-r border-black bg-[#F1E0DB] p-1 text-center font-medium uppercase">
      {children}
    </th>
  );
};

const TableDataGrade = ({
  professores,
  disciplina,
}: {
  disciplina: DisciplinaType | null;
  professores: ProfessorType[] | null;
}) => {
  const nomesProfessores = professores
    ?.filter((e) => e.id != INSTITUCIONAL_ID)
    .map((p) => p.name);

  return (
    <div className="flex flex-col">
      <span>{disciplina?.name || ""}</span>
      {professores && (
        <span className="text-xs">
          {nomesProfessores && nomesProfessores?.length > 0
            ? `(${nomesProfessores?.join(",")})`
            : ""}
        </span>
      )}
    </div>
  );
};

const TableHeader = () => {
  return (
    <thead>
      <tr className="text-center">
        <TableHeadding>Horário</TableHeadding>
        <TableHeadding>Segunda</TableHeadding>
        <TableHeadding>Terça</TableHeadding>
        <TableHeadding>Qurta</TableHeadding>
        <TableHeadding>Quinta</TableHeadding>
        <TableHeadding>Sexta</TableHeadding>
      </tr>
    </thead>
  );
};

const TableRowBreak = () => {
  return (
    <tr className="w-full">
      <td
        colSpan={6}
        className="border border-black bg-[#F1E0DB] text-center font-bold"
      >
        INTERVALO
      </td>
    </tr>
  );
};

const TableView = ({
  turma,
  remover,
  professor,
  disciplina,
  addToAll,
  classes,
}: TableProps) => {
  const [grade, setGrade] = useState<GradeType[][]>([]);
  const [alertAction, setAlertAction] =
    useState<AlertTypeData>(AlertDefaultData);

  /** GET DATA FROM LOCAL_STORAGE */
  useEffect(() => {
    setGrade(GET_GRADE);
  }, []);

  /** SET DATA TO LOCAL_STORAGE */
  useEffect(() => {
    if (grade.length) SET_GRADE(grade);
  }, [grade]);

  /**
   * FN_REMOVE_GRADE
   */
  const removeGrade = (ci: number, ri: number) => {
    const novaGradeData = [...grade];

    if (novaGradeData[ci][ri]?.[turma.id]) {
      delete novaGradeData[ci][ri]?.[turma.id];
    }

    setGrade(novaGradeData);
  };

  /**
   * FN_SET_NEW_GRADE
   */
  const setNewGrade = (ci: number, ri: number, data: GradeType) => {
    const novaGradeData = [...grade];
    novaGradeData[ci][ri] = { ...novaGradeData[ci][ri], ...data };
    setGrade(novaGradeData);
  };

  /**
   * FN_HANDLE -- ADD GRADE DATA;
   * 1 - Remover
   */
  const handleClickTable = (ci: number, ri: number) => {
    /** REMOVE DATA IF -- BTN_TOOGLE */
    if (remover) {
      removeGrade(ci, ri);
      return;
    }

    if (professor.id == "-1" || disciplina.id == "-1")
      return setAlertAction({
        message: "Selecione um professor e uma disciplina",
        state: true,
        type: AlertType.warning,
      });

    /**
     * VERIFY IF BTN_ADD_TO_ALL
     *
     */
    if (addToAll) {
      if (professor.id != INSTITUCIONAL_ID) {
        const allow = confirm(
          "Parece que você está tentando adicionar um professor para todas as turmas. Deseja prosseguir?",
        );
        if (!allow) return;
      }

      /** ELSE */
      let data = {};

      classes.forEach((turma) => {
        data = {
          ...data,
          [turma.id]: {
            professores: [{ id: professor.id, name: professor.name }],
            disciplina: { id: disciplina.id, name: disciplina.name },
          },
        };
      });

      const newGrade = [...grade];
      newGrade[ci][ri] = data;

      setGrade(newGrade);

      setAlertAction({
        message: "Adicionado em todas as turmas.",
        type: AlertType.success,
        state: true,
      });

      return;
    }

    const TARGET = grade[ci][ri]?.[turma.id];

    /** (1) **/
    const KEYS = Object.keys(grade[ci][ri]);
    const IDS = KEYS.map(
      (key) => grade[ci][ri]?.[key].professores.map((p) => p.id),
    ).flat();

    if (IDS.includes(professor.id) && professor.id != "0")
      return setAlertAction({
        message: "Professor já alocado nesse horário",
        state: true,
        type: AlertType.info,
      });

    /** (2) **/
    if (TARGET && TARGET.disciplina.id != disciplina.id) {
      if (
        !confirm(
          `${TARGET.disciplina.name} será substituido por ${disciplina.name}`,
        )
      ) {
        return;
      }
    }

    /** (3) **/
    const data =
      TARGET && TARGET.disciplina.id == disciplina.id
        ? {
            [turma.id]: {
              professores: [
                { id: professor.id, name: professor.name },
                ...TARGET.professores,
              ],
              disciplina: { id: disciplina.id, name: disciplina.name },
            },
          }
        : {
            [turma.id]: {
              professores: [{ id: professor.id, name: professor.name }],
              disciplina: { id: disciplina.id, name: disciplina.name },
            },
          };

    setNewGrade(ci, ri, data);
    setAlertAction({ ...alertAction, state: false });
  };

  /** CLEAR TURMA */
  const clearTurma = () => {
    if (!confirm(`Remover todos os dados da turma: ${turma.id}?`)) return;
    const newGrade = [...grade];
    newGrade.forEach((col) =>
      col.forEach((row) => {
        delete row[turma.id];
      }),
    );

    setGrade(newGrade);
  };

  /** CLEAR ALL GRADE */
  const clearAllGrade = () => {
    if (confirm("Essa ação apagara os dados de todas as turmas")) {
      setGrade(
        Array.from({ length: 5 }, () => Array.from({ length: 9 }, () => ({}))),
      );
    }
  };

  /** COMPONENTS */

  const TableData = ({ children, ci, ri }: TableDataProps) => {
    const gradeTarget = grade[ci][ri];

    const idsProfessoresAll = Object.keys(gradeTarget)
      .map((key) => gradeTarget?.[key].professores.map((p) => p.id))
      .flat();

    const idsProfessoresTurma = gradeTarget[turma.id]?.professores.map(
      (p) => p.id,
    );

    return (
      <td
        onClick={() => handleClickTable(ci, ri)}
        className={`text-black-700 group cursor-pointer border-b border-r border-black px-2 py-1  hover:text-opacity-50 ${
          idsProfessoresTurma?.includes(INSTITUCIONAL_ID) && "bg-orange-300"
        } ${idsProfessoresAll?.includes(professor.id) && "bg-gray-400"} ${
          gradeTarget?.[turma.id]?.disciplina?.id == "eo4" && "bg-purple-400"
        }`}
      >
        <div className="relative flex items-center justify-center">
          {children}
          {remover ? (
            <TrashIcon className="absolute h-8 w-8 text-red-800 opacity-0 duration-100 ease-in group-hover:opacity-100" />
          ) : (
            <AddCircleIcon className="absolute h-8 w-8 text-sky-800 opacity-0 duration-100 ease-in group-hover:opacity-100" />
          )}
        </div>
      </td>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Alert setAlertAction={setAlertAction} alertAction={alertAction}></Alert>
      <table className="min-w-full table-auto border-collapse border border-black text-sm">
        <TableHeader />

        <tbody className="text-center">
          {grade.length > 0 &&
            grade[0][0] &&
            Array.from({ length: 9 }, (_, ri) => {
              return (
                <React.Fragment key={ri}>
                  {[2, 5, 7].includes(ri) && <TableRowBreak />}

                  <tr className="w-full">
                    <TableHeadding>
                      <div className="flex w-full flex-col items-center justify-center">
                        <span className="font-bold">{`${ri + 1}º`}</span>
                        <span className="w-max text-xs">
                          {GRADE_SCHEDULE_HEADDING[ri]}
                        </span>
                      </div>
                    </TableHeadding>

                    {Array.from({ length: 5 }, (_, ci) => {
                      const data = grade[ci][ri]?.[turma.id];
                      const { disciplina, professores } = data || {
                        disciplina: null,
                        professores: null,
                      };
                      return (
                        <React.Fragment key={ci}>
                          <TableData key={ci} ci={ci} ri={ri}>
                            <TableDataGrade
                              disciplina={disciplina}
                              professores={professores}
                            />
                          </TableData>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
      </table>

      {/* ACTIONS */}
      <div className="flex flex-col gap-2 p-6">
        <div className="flex">
          <Button
            btnTitle="Limpar"
            btnType={ButtonType.primary}
            onClick={() => clearTurma()}
          >
            <EraseIcon className="h-6 w-6" />
          </Button>

          <Link href={"/print"}>
            <Button btnType={ButtonType.orange} btnTitle="Imprimir">
              <PrintIcon className="h-6 w-6" />
            </Button>
          </Link>

          <Link href={"/view"}>
            <Button btnTitle="Visualizar" btnType={ButtonType.purple}>
              <EyeIcon className="h-6 w-6" />
            </Button>
          </Link>

          <ExcelExportButton turma={turma.id} grade={grade} />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => clearAllGrade()}
            className="rounded-2xl border  border-slate-900 px-4 text-sm hover:scale-105 hover:text-gray-600"
          >
            Limpar todas as turmas
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableView;
