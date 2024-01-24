"use client";

import React, { useState } from "react";

import {
  CheckIcon,
  DownloadIcon,
  JsonIcon,
  UploadIcon,
} from "@/public/assets/icons";
import {
  AlertDefaultData,
  AlertType,
  AlertTypeData,
} from "../components/Alert";

import Alert from "../components/Alert";
import TablePreView from "./components/TablePreView";
import ProfessoresPreView from "./components/ProfessoresPreView";
import DisciplinasPreView from "./components/DisciplinasPreView";

const UploadFormIcon = () => {
  return (
    <svg
      className="mb-4 h-8 w-8 text-gray-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
      />
    </svg>
  );
};

export default function Backup() {
  const [alertAction, setAlertAction] =
    useState<AlertTypeData>(AlertDefaultData);

  const [showGradePreview, setShowGradePreview] = useState(false);
  const [showProfessoresPreview, setShowProfessoresPreview] = useState(false);
  const [showDisciplinasPreview, setShowDisciplinasPreview] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<any | null>(null);

  const getDataGrade = () => {
    const dataJSON = localStorage.getItem("data_grade");
    const data = dataJSON
      ? JSON.parse(dataJSON)
      : Array.from({ length: 5 }, () => Array.from({ length: 9 }, () => ({})));
    return data;
  };
  const getDataProfessores = () => {
    const dataJSON = localStorage.getItem("data_professores");
    if (dataJSON) {
      try {
        const data = JSON.parse(dataJSON);
        return data;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
      }
    }
  };
  const getDataDisicplinas = () => {
    const dataJSON = localStorage.getItem("data_disciplinas");

    if (dataJSON) {
      try {
        const data = JSON.parse(dataJSON);
        return data;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAlertAction({ ...alertAction, state: false });

      if (!file.name.match(/.*\.json$/)) {
        setAlertAction({
          message: "Esse não parece ser um formato de arquivo suportado",
          state: true,
          type: AlertType.danger,
        });

        setSelectedFile(null);

        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          setFileContent(JSON.parse(content)); // Convertendo o conteúdo para JSON
        } catch (error) {
          console.error("Erro ao analisar o JSON:", error);
          setFileContent(null);
          setAlertAction({
            message: "Erro ao analisar o arquivo.",
            state: true,
            type: AlertType.danger,
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const downloadJSON = (jsonData: any, filename: string) => {
    const blobData = new Blob([JSON.stringify(jsonData)], {
      type: "application/json",
    });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blobData);
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  };

  const handleDownload = () => {
    const date = new Date();

    const dateStr = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}--${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    const filename = `horario_backup_${dateStr}.json`;

    const data = {
      ["data_grade"]: getDataGrade(),
      ["data_professores"]: getDataProfessores(),
      ["data_disciplinas"]: getDataDisicplinas(),
      ["info"]: {
        date: `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        file: filename,
      },
    };

    downloadJSON(data, filename);
  };

  const handleUpload = () => {
    if (!selectedFile)
      return setAlertAction({
        message: "Adicione um arquivo",
        state: true,
        type: AlertType.warning,
      });

    if (
      !confirm(
        "Ao enviar, o horário atual será substituido pelos dados do backup.",
      )
    )
      return;

    if (
      !fileContent?.["data_grade"] ||
      !fileContent?.["data_professores"] ||
      !fileContent?.["data_disciplinas"]
    ) {
      return setAlertAction({
        message:
          "Os dados do arquivo não são compatíveis com as informações esperadas!",
        type: AlertType.danger,
        state: true,
      });
    }

    const { data_grade, data_professores, data_disciplinas } = fileContent;

    localStorage.setItem("data_grade", JSON.stringify(data_grade));
    localStorage.setItem("data_professores", JSON.stringify(data_professores));
    localStorage.setItem("data_disciplinas", JSON.stringify(data_disciplinas));

    setFileContent(null);
    setSelectedFile(null);
    setAlertAction({
      message: "Dados atualizados com sucesso",
      type: AlertType.success,
      state: true,
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 px-4">
      <div className="p-4 text-2xl font-bold">BACKUP</div>{" "}
      <Alert alertAction={alertAction} setAlertAction={setAlertAction} />
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className=" flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
        >
          {selectedFile ? (
            <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
              <JsonIcon className="h-20 w-20 text-orange-600" />
              <span className="text-xs">{selectedFile.name}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <UploadFormIcon />
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Clique para enviar</span> ou
                arraste e solte
              </p>
              <p className="text-xs text-gray-500 ">JSON (horario_backup)</p>
            </div>
          )}

          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="flex w-full gap-2">
        <button
          onClick={handleDownload}
          type="button"
          className="mb-2 me-2 flex w-full items-center justify-center gap-2  rounded-lg bg-blue-600 px-5 py-2.5 text-sm  font-medium text-white  hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
        >
          <DownloadIcon className="h-8 w-8" />
          <span>Baixar</span>
        </button>
        <button
          onClick={handleUpload}
          type="button"
          className="mb-2 me-2 flex w-full items-center justify-center gap-2  rounded-lg bg-green-600 px-5 py-2.5 text-sm  font-medium text-white  hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-800"
        >
          <UploadIcon className="h-8 w-8" />
          <span>Enviar</span>
        </button>
      </div>
      {fileContent && (
        <div className="flex w-full flex-col gap-2 rounded-2xl border-2 border-dashed p-2 text-sm uppercase">
          <div className="font-bold">Preview</div>
          <ul className="text-gray-600 ">
            <li>
              <button
                onClick={() => setShowGradePreview((prev) => !prev)}
                className="flex items-center justify-center gap-2 text-sm uppercase hover:font-bold hover:text-green-600"
              >
                <span>{"->"} Horário de todas as turmas.</span>
                {fileContent["data_grade"] && (
                  <CheckIcon className="h-5 w-5 text-green-600" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowProfessoresPreview(true)}
                className="flex items-center justify-center gap-2 text-sm uppercase hover:font-bold hover:text-green-600"
              >
                <span>{"->"} Dados dos professores cadastrados.</span>
                {fileContent["data_professores"] && (
                  <CheckIcon className="h-5 w-5 text-green-600" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowDisciplinasPreview(true)}
                className="flex items-center justify-center gap-2 text-sm uppercase hover:font-bold hover:text-green-600"
              >
                <span>{"->"} Dados das disciplinas cadastradas.</span>
                {fileContent["data_disciplinas"] && (
                  <CheckIcon className="h-5 w-5 text-green-600" />
                )}
              </button>
            </li>
          </ul>
        </div>
      )}
      {fileContent && (
        <div className="flex w-full flex-col gap-2 rounded-2xl border-2 border-dashed p-2 text-sm uppercase">
          <div className="font-bold">Info.</div>
          <ul className="text-gray-600 hover:text-green-600">
            <li>
              {"->"} <span className="font-bold">Data</span>:{" "}
              {fileContent?.["info"]?.date || "não definida"}{" "}
            </li>
            <li>
              {"->"} <span className="font-bold">Arquivo</span>:{" "}
              {fileContent?.["info"]?.file || "não definido"}{" "}
            </li>
            <li>
              {"->"} <span className="font-bold">Status</span>: Lido
            </li>
          </ul>
        </div>
      )}
      {showGradePreview && fileContent?.["data_grade"] && (
        <TablePreView
          grade={fileContent?.["data_grade"]}
          title={fileContent?.["info"]?.date}
          setShowGradePreview={setShowGradePreview}
        />
      )}
      {showProfessoresPreview && fileContent?.["data_professores"] && (
        <ProfessoresPreView
          title={fileContent?.["info"]?.date}
          setShowProfessoresPreview={setShowProfessoresPreview}
          professores={fileContent?.["data_professores"]}
        />
      )}
      {showDisciplinasPreview && fileContent?.["data_disciplinas"] && (
        <DisciplinasPreView
          title={fileContent?.["info"]?.date}
          setShowDisciplinasPreview={setShowDisciplinasPreview}
          disciplinas={fileContent?.["data_disciplinas"]}
        />
      )}
    </div>
  );
}
