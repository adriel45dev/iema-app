"use client";

import Link from "next/link";
import MenuOptions from "./components/MenuOptions";
import {
  ClipboardIcon,
  UsersIcon,
  CourseIcon,
  TeacherIcon,
  BackupIcon,
  HistoryIcon,
} from "@/public/assets/icons";
import { useEffect } from "react";
import { DATA_DEF, DATA_PROFESSOR, DATA_DISCIPLINAS } from "../constants";

export default function Home() {
  useEffect(() => {
    const dataProfessoresJSON = localStorage.getItem(DATA_DEF.dataProfessores);
    const dataDisciplinasJSON = localStorage.getItem(DATA_DEF.dataDisciplinas);

    if (!dataProfessoresJSON) {
      localStorage.setItem(
        DATA_DEF.dataProfessores,
        JSON.stringify(DATA_PROFESSOR),
      );
    }

    if (!dataDisciplinasJSON) {
      localStorage.setItem(
        DATA_DEF.dataDisciplinas,
        JSON.stringify(DATA_DISCIPLINAS),
      );
    }
  }, []);

  return (
    <main className="min-w-screen flex min-h-screen flex-col items-center justify-start bg-gray-100 p-4 sm:justify-center sm:p-24">
      <div className="grid w-full grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-4">
        <Link href={"/grade"}>
          <MenuOptions title="Horário">
            <ClipboardIcon className="h-16 w-16" />
          </MenuOptions>
        </Link>

        <Link href={"/individual"}>
          <MenuOptions title="Individual">
            <TeacherIcon className="h-16 w-16" />
          </MenuOptions>
        </Link>

        <Link href={"/disciplinas"}>
          <MenuOptions title="Disciplinas">
            <CourseIcon className="h-16 w-16" />
          </MenuOptions>
        </Link>

        <Link href={"/professores"}>
          <MenuOptions title="Professores">
            <UsersIcon className="h-16 w-16" />
          </MenuOptions>
        </Link>

        <Link href={"/backup"}>
          <MenuOptions title="Backup">
            <BackupIcon className="h-16 w-16" />
          </MenuOptions>
        </Link>

        <Link href={"/sincronizar"}>
          <MenuOptions title="Sincronizar">
            <HistoryIcon className="h-16 w-16" />
          </MenuOptions>
        </Link>
      </div>
    </main>
  );
}
