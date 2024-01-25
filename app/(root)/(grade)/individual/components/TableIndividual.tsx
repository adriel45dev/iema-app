"use client";
import {
  GET_GRADE,
  GRADE_SCHEDULE_HEADDING,
  GRADE_WEEK_HEADDING,
} from "@/app/constants";
import { GradeType } from "@/app/shared/type";
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

const TableData = ({ children }: { children?: React.ReactNode }) => {
  return (
    <td className="b w-max border-b border-r border-black p-1 text-center font-medium uppercase hover:bg-slate-200">
      {children}
    </td>
  );
};

// const PROFESSOR_ID = "1706055233078";

export default function TableIndividual({
  PROFESSOR_ID,
}: {
  PROFESSOR_ID: string;
}) {
  const [grade, setGrade] = useState<GradeType[][]>([]);
  const [indexTable, setIndexTable] = useState(0);

  useEffect(() => {
    setGrade(GET_GRADE);
  }, []);

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
                    <tr className="">
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
                              .includes(PROFESSOR_ID),
                          );

                        return (
                          <>
                            {professor.length > 0 ? (
                              <>
                                <TableDataDefault>
                                  {professor.length > 1 ? (
                                    <span className="font-bold text-orange-600">
                                      *
                                    </span>
                                  ) : (
                                    professor[0].turma
                                  )}
                                </TableDataDefault>

                                <TableData>
                                  {professor[0].disciplina.name}
                                </TableData>
                              </>
                            ) : (
                              <>
                                <TableDataDefault></TableDataDefault>
                                <TableData></TableData>
                              </>
                            )}
                          </>
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
                    sala.professores.map((p) => p.id).includes(PROFESSOR_ID),
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
                        <>
                          <TableDataDefault>
                            {professor.length > 1 ? (
                              <span className="font-bold text-orange-600">
                                *
                              </span>
                            ) : (
                              professor[0].turma
                            )}
                          </TableDataDefault>

                          <TableData>{professor[0].disciplina.name}</TableData>
                        </>
                      ) : (
                        <>
                          <TableDataDefault></TableDataDefault>
                          <TableData></TableData>
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

      {/* AÇÕES */}
    </>
  );
}
