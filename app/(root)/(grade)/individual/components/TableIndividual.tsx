"use client";
import {
  GET_GRADE,
  GRADE_SCHEDULE_HEADDING,
  GRADE_WEEK_HEADDING,
  SET_GRADE,
} from "@/app/constants";
import {
  DisciplinaType,
  DisciplinasType,
  GradeType,
  ProfessorType,
} from "@/app/shared/type";
import { ArrowLeftIcon, ArrowRightIcon } from "@/public/assets/icons";
import React, { useEffect, useState } from "react";

const TableHeadding = ({ children }: { children?: React.ReactNode }) => {
  return (
    <th
      scope="col"
      colSpan={2}
      className="w-max border-b border-r border-black bg-blue-300 p-1 text-center font-bold uppercase"
    >
      {children}
    </th>
  );
};

const TableSubHeadding = ({ children }: { children?: React.ReactNode }) => {
  return (
    <th
      scope="col"
      className="w-max border-b border-r border-black bg-blue-300 p-1 text-center font-medium uppercase"
    >
      {children}
    </th>
  );
};

const TableDataDefault = ({ children }: { children?: React.ReactNode }) => {
  return (
    <td className="b w-max border-b border-r border-black p-1 text-center font-medium uppercase">
      {children}
    </td>
  );
};

const TableRowBreak = () => {
  return (
    <tr className="w-full">
      <td
        colSpan={12}
        className="border border-black bg-blue-300 text-center text-xs font-medium"
      >
        INTERVALO
      </td>
    </tr>
  );
};

type TableIndividualProps = {
  // selectedProfessor.id: string;
  atribuicao: { name: string; id: string };
  selectedProfessor: { name: string; id: string };
  remover: boolean;
  professores: ProfessorType[];
};

export default function TableIndividual({
  selectedProfessor,
  atribuicao,
  remover,
  professores,
}: TableIndividualProps) {
  const [grade, setGrade] = useState<GradeType[][]>([]);
  const [indexTable, setIndexTable] = useState(0);

  useEffect(() => {
    setGrade(GET_GRADE);
  }, []);

  useEffect(() => {
    if (grade.length > 0) {
      SET_GRADE(grade);
    }
  }, [grade]);

  const handleClickTable = (ci: number, ri: number) => {
    if (remover) {
      const newData = [...grade];
      delete newData[ci][ri]?.[selectedProfessor.id];
      setGrade(newData);

      return;
    }

    /***
     * 1 - Verificar se um professor e uma atribuição foram selecionados
     * 2 - Verificar se o professor já está cadastrado no mesmo horário
     * 3 - Adicionar a nova atribuição a grade -- ["304"]{professores:[{id:P}], disciplina:"T.P.M"}
     */

    const FN_ADD_DATA = () => {
      const newGrade = [...grade];
      const data = {
        [selectedProfessor.id]: {
          disciplina: { id: atribuicao.id, name: atribuicao.name },
          professores: [
            { id: selectedProfessor.id, name: selectedProfessor.name },
          ],
        },
      };
      newGrade[ci][ri] = { ...newGrade[ci][ri], ...data };

      setGrade(newGrade);
    };

    const TARGET_GRID = grade[ci][ri];
    const TURMAS_KEY = Object.keys(TARGET_GRID);
    const ARRAY_DATA_GRID_TARGET_IDS = TURMAS_KEY.map((TURMA_KEY) =>
      TARGET_GRID[TURMA_KEY].professores.map((PROFESSOR) => PROFESSOR.id),
    ).flat();

    if (atribuicao.id == "-1" || selectedProfessor.id == "-1")
      return alert("Selecione um professor e uma atribuição");

    if (ARRAY_DATA_GRID_TARGET_IDS.includes(selectedProfessor.id))
      return alert(
        "Profesor já alocado. Vá até a matriz de horários para gerenciar as disciplians cadastradas.",
      );

    FN_ADD_DATA();
  };

  const handleRemoverAtribuicoes = () => {
    if (
      !confirm(
        "Esta ação resultará na exclusão de todas as atribuições do professor selecionado.",
      )
    )
      return;
    const newData = [...grade];
    newData.forEach((col) =>
      col.forEach((row) => {
        delete row[selectedProfessor.id];
      }),
    );

    setGrade(newData);
  };

  const TableData = ({
    children,
    ci,
    ri,
  }: {
    children?: React.ReactNode;
    ci: number;
    ri: number;
  }) => {
    return (
      <td
        onClick={() => handleClickTable(ci, ri)}
        className="b w-max border-b border-r border-black p-1 text-center font-medium uppercase hover:bg-slate-200"
      >
        {children}
      </td>
    );
  };

  return (
    <>
      <div className="hidden w-full sm:flex">
        <table className="w-full border border-black text-center uppercase">
          <thead>
            <tr className="border border-black">
              <TableHeadding>Horário</TableHeadding>
              <TableHeadding>Segunda</TableHeadding>
              <TableHeadding>Terça</TableHeadding>
              <TableHeadding>Quarta</TableHeadding>
              <TableHeadding>Quinta</TableHeadding>
              <TableHeadding>Sexta</TableHeadding>
            </tr>
            <tr className="border-b">
              <TableHeadding />

              <TableSubHeadding>Turma</TableSubHeadding>
              <TableSubHeadding>Componente</TableSubHeadding>

              <TableSubHeadding>Turma</TableSubHeadding>
              <TableSubHeadding>Componente</TableSubHeadding>

              <TableSubHeadding>Turma</TableSubHeadding>
              <TableSubHeadding>Componente</TableSubHeadding>

              <TableSubHeadding>Turma</TableSubHeadding>
              <TableSubHeadding>Componente</TableSubHeadding>

              <TableSubHeadding>Turma</TableSubHeadding>
              <TableSubHeadding>Componente</TableSubHeadding>
            </tr>
          </thead>

          <tbody>
            {grade.length > 0 &&
              grade[0][0] &&
              Array.from({ length: 9 }, (_, ri) => {
                return (
                  <React.Fragment key={ri}>
                    {[2, 5, 7].includes(ri) && <TableRowBreak />}
                    <tr>
                      <TableHeadding>
                        <div className="flex flex-col text-xs">
                          <span>{ri + 1}º</span>
                          <span>{GRADE_SCHEDULE_HEADDING[ri]}</span>
                        </div>
                      </TableHeadding>

                      {Array.from({ length: 5 }, (_, ci) => {
                        const data = grade[ci][ri];
                        const keys = Object.keys(data);

                        const professor = keys
                          .map((key) => ({ ...data[key], turma: key }))
                          .filter((sala) =>
                            sala.professores
                              .map((p) => p.id)
                              .includes(selectedProfessor.id),
                          );

                        return (
                          <React.Fragment key={ci}>
                            {professor.length > 0 ? (
                              <>
                                <TableDataDefault>
                                  {professor.length > 1 ||
                                  professor[0]?.disciplina.id == "tpm" ||
                                  professor[0]?.disciplina.id.includes(
                                    "att",
                                  ) ? (
                                    <span className="font-bold text-orange-600">
                                      *
                                    </span>
                                  ) : (
                                    professor[0].turma
                                  )}
                                </TableDataDefault>

                                <TableData ci={ci} ri={ri}>
                                  {professor[0].disciplina.name}
                                </TableData>
                              </>
                            ) : (
                              <>
                                <TableDataDefault></TableDataDefault>
                                <TableData ci={ci} ri={ri}></TableData>
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="flex w-full flex-col sm:hidden">
        <table className="w-full border border-black text-center uppercase">
          <thead>
            <tr className="border border-black">
              <TableHeadding>Horário</TableHeadding>
              <TableHeadding>{GRADE_WEEK_HEADDING[indexTable]}</TableHeadding>
            </tr>
            <tr className="border-b">
              <TableHeadding />
              <TableSubHeadding>Turma</TableSubHeadding>
              <TableSubHeadding>Componente</TableSubHeadding>
            </tr>
          </thead>

          <tbody>
            {grade.length > 0 &&
              grade[0][0] &&
              Array.from({ length: 9 }, (_, ri) => {
                const data = grade[indexTable][ri];
                const keys = Object.keys(data);

                const professor = keys
                  .map((key) => ({ ...data[key], turma: key }))
                  .filter((sala) =>
                    sala.professores
                      .map((p) => p.id)
                      .includes(selectedProfessor.id),
                  );

                return (
                  <React.Fragment key={ri}>
                    <tr className="">
                      <TableHeadding>
                        <div className="flex flex-col text-xs">
                          <span>{ri + 1}º</span>
                          <span>{GRADE_SCHEDULE_HEADDING[ri]}</span>
                        </div>
                      </TableHeadding>

                      {professor.length > 0 ? (
                        <React.Fragment key={ri}>
                          <TableDataDefault>
                            {professor.length > 1 ? (
                              <span className="font-bold text-orange-600">
                                *
                              </span>
                            ) : (
                              professor[0].turma
                            )}
                          </TableDataDefault>

                          <TableData ci={indexTable} ri={ri}>
                            {professor[0].disciplina.name}
                          </TableData>
                        </React.Fragment>
                      ) : (
                        <>
                          <TableDataDefault></TableDataDefault>
                          <TableData ci={indexTable} ri={ri}></TableData>
                        </>
                      )}
                    </tr>
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>

        <div className="flex w-full items-center justify-between gap-2 py-2 text-slate-700 ">
          <button
            className="hover:text-blue-500"
            onClick={() =>
              setIndexTable((prev) => (prev - 1 >= 0 ? prev - 1 : 4))
            }
          >
            <ArrowLeftIcon className="h-10 w-10" />
          </button>

          <span className="font-bold uppercase text-blue-500">
            {GRADE_WEEK_HEADDING[indexTable]}
          </span>
          <button
            className="hover:text-blue-500"
            onClick={() => setIndexTable((prev) => (prev + 1) % 5)}
          >
            <ArrowRightIcon className="h-10 w-10" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex w-full items-center justify-center gap-2">
        <div className="flex justify-center">
          <button
            onClick={() => handleRemoverAtribuicoes()}
            className="rounded-2xl border  border-slate-900 px-4 text-sm hover:scale-105 hover:text-gray-600"
          >
            Remover atribuições do professor
          </button>
        </div>
      </div>

      {/* AÇÕES */}
    </>
  );
}
