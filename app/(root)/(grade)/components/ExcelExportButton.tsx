"use client";
import React, { useEffect, useState } from "react";
import * as ExcelJS from "exceljs";
import { ExelLogoIcon } from "@/public/assets/icons";
import Button, { ButtonType } from "./Button";

import { GradeType } from "@/app/shared/type";

const createExcelBlob = async (matrix: any[][]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  // Preencha a planilha com os dados da matriz
  matrix[0].forEach((_, columnIndex) => {
    const columnData = matrix.map((row) => row[columnIndex]);
    worksheet.addRow(columnData);
  });

  // Crie um blob a partir dos dados do Excel
  const excelBlob = await workbook.xlsx.writeBuffer();
  const blob = new Blob([excelBlob], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return blob;
};

const formatDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${day}-${month}-${year}-${hours}${minutes}${seconds}`;
};

const ExcelExportButton = ({
  grade,
  turma,
}: {
  grade: GradeType[][];
  turma: string;
}) => {
  const handleExport = async () => {
    const header = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
    const horario = [
      "Horário",
      "1º",
      "2º",
      "3º",
      "4º",
      "5º",
      "6º",
      "7º",
      "8º",
      "9º",
    ];

    const data = [
      horario,
      ...grade.map((col, ci) => [
        header[ci],
        ...col.map((row) => {
          return `${row[turma]?.disciplina.name || ""} (${
            row[turma]?.professores.map((p) => p.name).join(", ") || ""
          })`;
        }),
      ]),
    ];

    const blob = await createExcelBlob(data);
    const url = URL.createObjectURL(blob);

    // Crie um link e clique nele para iniciar o download
    const link = document.createElement("a");
    link.href = url;
    link.download = `HORARIO_${turma}_${formatDate()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button btnTitle="Exel" btnType={ButtonType.success} onClick={handleExport}>
      <ExelLogoIcon className="h-6 w-6" />
    </Button>
  );
};

export default ExcelExportButton;
