"use client";
import React from "react";
import Button, { ButtonType } from "./Button";
import { ExelLogoIcon } from "@/public/assets/icons";
import * as XLSX from "xlsx";
import { GradeType } from "@/app/shared/type";
import {
  GET_DATE_STR,
  GRADE_SCHEDULE_HEADDING,
  GRADE_WEEK_HEADDING,
  TURMAS,
} from "@/app/constants";

const criarPlanilha = (gradeEscolar: GradeType[][]) => {
  const workbook = XLSX.utils.book_new();
  const diasDaSemana = GRADE_WEEK_HEADDING;
  const turmas = TURMAS.map((T) => T.id);

  turmas.forEach((turmaKey) => {
    const worksheetData = [];

    worksheetData.push(["", ...diasDaSemana]);

    for (let turno = 0; turno < 9; turno++) {
      const linha = [`${turno + 1}º ${GRADE_SCHEDULE_HEADDING[turno]}`];
      for (let dia = 0; dia < 5; dia++) {
        const horario = gradeEscolar[dia][turno][turmaKey];
        const disciplina = horario?.disciplina?.name || "";
        const professores =
          horario?.professores?.map((prof) => prof.name).join(", ") || "";
        linha.push(`${disciplina} (${professores})`);
      }
      worksheetData.push(linha);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Turma ${turmaKey}`);
  });

  XLSX.writeFile(workbook, `horario_iema_${GET_DATE_STR()}.xlsx`);
};

export default function ExelExportAllButton({
  grade,
}: {
  grade: GradeType[][];
}) {
  return (
    <Button
      btnTitle="Exel"
      btnType={ButtonType.success}
      onClick={() => criarPlanilha(grade)}
    >
      <ExelLogoIcon className="h-6 w-6" />
    </Button>
  );
}
