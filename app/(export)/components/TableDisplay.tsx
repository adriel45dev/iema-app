"use client";

import TableData from "./TableData";
import TableDataInterval from "./TableDataInterval";
import TableHeadding from "./TableHeadding";
import React, { useEffect, useState } from "react";
import { GradeType } from "@/app/shared/type";
import { GET_GRADE } from "@/app/constants";

export default function TableDisplay({ turma }: { turma: string }) {
  const weekendHeader = [
    { title: "Segunda", abbr: "S" },
    { title: "Terça", abbr: "T" },
    { title: "Quarta", abbr: "Q" },
    { title: "Quinta", abbr: "Q" },
    { title: "Sexta", abbr: "S" },
  ];

  const [grade, setGrade] = useState<GradeType[][]>([]);

  useEffect(() => {
    setGrade(GET_GRADE());
  }, []);

  return (
    <div className="flex w-full flex-row rounded border border-slate-900">
      <div className="flex w-full flex-col">
        <TableHeadding title="Horário" abbr="H" />
        <TableHeadding title="1º" time="07h35 - 8h25" />
        <TableHeadding title="2º" time="08h25 - 9h10" />
        <TableDataInterval />
        <TableHeadding title="3º" time="09h30- 10h20" />
        <TableHeadding title="4º" time="10h20 - 11h10" />
        <TableHeadding title="5º" time="11h10 - 12h00" />
        <TableDataInterval />
        <TableHeadding title="6º" time="13h30 - 14h20" />
        <TableHeadding title="7º" time="14h20 - 15h05" />
        <TableDataInterval />
        <TableHeadding title="8º" time="15h20 - 16h10" />
        <TableHeadding title="9º" time="16h10 - 17h00" />
      </div>

      {grade?.map((col, ci) => {
        return (
          <div className="flex w-full flex-col" key={ci}>
            <TableHeadding
              title={weekendHeader[ci].title}
              abbr={weekendHeader[ci].abbr}
            />

            {col.map((row, ri) => (
              <React.Fragment key={ri}>
                <TableData
                  professores={row?.[turma]?.professores}
                  disciplina={row?.[turma]?.disciplina}
                />
                {[1, 6].includes(ri) && (
                  <TableDataInterval
                    title={ci == 2 ? "INTERVALO" : ""}
                    key={ri + "i"}
                  />
                )}
                {[4].includes(ri) && (
                  <TableDataInterval
                    title={ci == 2 ? "ALMOÇO" : ""}
                    key={ri + "i"}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
}
