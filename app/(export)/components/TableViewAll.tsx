import React from "react";
import Image from "next/image";
import { GradeType } from "@/app/shared/type";
import { INSTITUCIONAL_ID } from "@/app/constants";

type TableDataProps = {
  children: React.ReactNode;
  ci: number;
  ri: number;
};

type TableProps = {
  turma: { name: string; id: string; title: string };
  grade: GradeType[][];
};

const TableHeadding = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="w-max border-b border-r border-black bg-[#F1E0DB] p-1 text-center font-medium uppercase">
      {children}
    </th>
  );
};

const TableDataGrade = ({
  professor,
  disciplina,
}: {
  disciplina: string | null;
  professor: string | null;
}) => {
  return (
    <div className="flex flex-col">
      <span>{disciplina}</span>
      {professor && <span className="text-xs">({professor})</span>}
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

const TableViewAll = ({ turma, grade }: TableProps) => {
  const gradeScheduleHeadding = [
    "07h35 - 08h25",
    "08h25 - 09h10",
    "09h30 - 10h20",
    "10h20 - 11h10",
    "11h10 - 12h00",
    "13h30 - 14h20",
    "14h20 - 15h05",
    "15h20 - 16h10",
    "16h10 - 17h00",
  ];

  /** COMPONENTS */
  const TableData = ({ children, ci, ri }: TableDataProps) => {
    const gradeTarget = grade[ci][ri];
    const idsProfessores = gradeTarget[turma.id]?.professores.map((p) => p.id);

    return (
      <td
        className={`text-black-700 group cursor-pointer border-b border-r border-black px-2 py-1  hover:text-opacity-50 ${
          idsProfessores?.includes(INSTITUCIONAL_ID) && "bg-orange-300"
        }`}
      >
        <div className="relative flex items-center justify-center">
          {children}
        </div>
      </td>
    );
  };

  return (
    <div className="flex w-full break-after-page flex-col items-center justify-center p-2">
      <div className="flex w-full flex-row items-center justify-between gap-2 px-6 py-2">
        <div className="font-bold">
          <div>HORÁRIO DE AULAS – IP PRESIDENTE DUTRA</div>
          <div>{`TURMA: ${turma.id} - ${turma.title}`}</div>
        </div>

        <div>
          <Image
            src={"/assets/imgs/logo_iema_transparent.png"}
            alt="logo"
            width={400}
            height={100}
          />
        </div>
      </div>
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
                          {gradeScheduleHeadding[ri]}
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
                              disciplina={disciplina?.name || ""}
                              professor={
                                professores?.map((p) => p.name).join(", ") || ""
                              }
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
    </div>
  );
};

export default TableViewAll;
