"use client";
import React, { useEffect, useState } from "react";
import TableHeadding from "./components/TableHeadding";
import TableDataInterval from "./components/TableDataInterval";
import TableData from "./components/TableData";
import Select from "../components/Select";

type ProfessoresType = {
  name: string;
  id: string;
};

type GradeType = {
  [key: string]: {
    professores: { id: string; name: string }[];
    disciplina: { id: string; name: string };
  };
};

type DataProfessorType = {
  disciplina: string;
  turma: string;
};
export default function Individual() {
  const [grade, setGrade] = useState<GradeType[][]>([]);
  const [professores, setProfessores] = useState<ProfessoresType[]>([]);
  const [professor, setProfessor] = useState({ name: "", id: "-1" });
  const [dataProfessor, setDataProfessor] = useState<DataProfessorType[][]>(
    Array.from({ length: 5 }, () =>
      Array.from({ length: 9 }, () => ({ disciplina: "", turma: "" })),
    ),
  );
  const weekendHeader = [
    { title: "Segunda", abbr: "S" },
    { title: "Terça", abbr: "T" },
    { title: "Quarta", abbr: "Q" },
    { title: "Quinta", abbr: "Q" },
    { title: "Sexta", abbr: "S" },
  ];

  // Professores
  useEffect(() => {
    const dataJSON = localStorage.getItem("data_professores");
    if (dataJSON) {
      try {
        const data = JSON.parse(dataJSON);
        setProfessores(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);
  // Grade
  useEffect(() => {
    const dataJSON = localStorage.getItem("data_grade");
    const data = dataJSON
      ? JSON.parse(dataJSON)
      : Array.from({ length: 5 }, () => Array.from({ length: 9 }, () => ({})));
    setGrade(data);
  }, []);

  useEffect(() => {
    if (professor && professor.id != "-1") {
      const data = grade.map((col, ci) => {
        return col.map((row) => {
          const keys = Object.keys(row);
          return (
            keys.map((key) => {
              if (
                row[key]?.professores.map((p) => p.id).includes(professor.id)
              ) {
                return {
                  disciplina: row[key].disciplina.name,
                  turma: professor.id == "0" ? "*" : key,
                };
              }
            })[0] || { disciplina: "", turma: "" }
          );
        });
      });
      setDataProfessor(data);
    }
  }, [professor]);

  return (
    <div className="flex min-h-screen w-full  flex-col items-center justify-center p-4 pb-16">
      <div className="flex items-center justify-center gap-2 p-4 text-2xl ">
        <span className="font-bold">HORÁRIO INDIVIDUAL</span>
        <span className="text-lg"> | {professor.name}</span>
      </div>

      <div className="w-full py-4">
        <Select
          title="Professor"
          data={professores}
          dataSelected={professor}
          setDataSelected={setProfessor}
        />
      </div>

      <div className="flex w-full rounded border border-r border-t border-slate-800">
        <div className="flex w-full flex-col">
          <TableHeadding title="Horário" abbr="H" />
          <TableHeadding title="" abbr="" />
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

        {dataProfessor.map((col, ci) => {
          return (
            <div key={ci} className="w-full flex-col">
              <TableHeadding
                title={weekendHeader[ci].title}
                abbr={weekendHeader[ci].abbr}
              />
              <div className="flex">
                {/* Turma COL */}
                <div className="flex w-full flex-col">
                  <TableHeadding title="Turma" abbr="T" />
                  {col.map((row, ri) => (
                    <React.Fragment key={ri}>
                      <TableData name={row.turma} />
                      {[1, 6].includes(ri) && (
                        <TableDataInterval
                          title={ci == 2 ? "" : ""}
                          key={ri + "i"}
                        />
                      )}
                      {[4].includes(ri) && (
                        <TableDataInterval
                          title={ci == 2 ? "" : ""}
                          key={ri + "i"}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {/* Componente COL */}
                <div className="flex w-full flex-col">
                  <TableHeadding title="Componente" abbr="C" />
                  {col.map((row, ri) => (
                    <React.Fragment key={ri}>
                      <TableData name={row.disciplina} />
                      {[1, 6].includes(ri) && (
                        <TableDataInterval
                          title={ci == 1 ? "" : ""}
                          key={ri + "i"}
                        />
                      )}
                      {[4].includes(ri) && (
                        <TableDataInterval
                          title={ci == 1 ? "" : ""}
                          key={ri + "i"}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* <div className="w-full flex-col">
          <TableHeadding title="Segunda" abbr="S" />

          <div className="flex">
            <div className="flex w-full flex-col">
              <TableHeadding title="Turma" abbr="T" />
              <TableData name={""} />
              <TableData name={""} />
              <TableDataInterval />

              <TableData name={""} />
              <TableData name={""} />
              <TableData name={""} />
              <TableDataInterval />

              <TableData name={""} />
              <TableData name={""} />
              <TableDataInterval />

              <TableData name={""} />
              <TableData name={""} />
            </div>

            <div className="flex w-full flex-col">
              <TableHeadding title="Componente" abbr="C" />
              <TableData name={""} />
              <TableData name={""} />
              <TableDataInterval />

              <TableData name={""} />
              <TableData name={""} />
              <TableData name={""} />
              <TableDataInterval />

              <TableData name={""} />
              <TableData name={""} />
              <TableDataInterval />

              <TableData name={""} />
              <TableData name={""} />
            </div>

          </div>
        </div> */}
      </div>
    </div>
  );
}
