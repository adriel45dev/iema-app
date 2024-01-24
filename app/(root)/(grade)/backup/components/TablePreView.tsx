"use client";
import TableViewAll from "@/app/(export)/components/TableViewAll";
import { GET_GRADE, TURMAS } from "@/app/constants";
import { AddCircleIcon, BackIcon } from "@/public/assets/icons";
import React, { useEffect, useState } from "react";
import { GradeType } from "@/app/shared/type";

type TablePreViewProps = {
  grade: GradeType[][];
  title: string;
  setShowGradePreview: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TablePreView({
  grade,
  title,
  setShowGradePreview,
}: TablePreViewProps) {
  return (
    <div className="absolute z-50 flex min-h-max w-screen flex-col items-center rounded-lg bg-white p-8 ">
      <button
        onClick={() => setShowGradePreview(false)}
        className="flex w-full justify-start focus:ring-gray-700"
      >
        <BackIcon className="h-10 w-10 text-slate-600 hover:scale-105 hover:text-blue-600" />
      </button>
      <h1 className="text-lg font-bold uppercase">Horário Preview - {title}</h1>
      <>
        {TURMAS.map((c, i) => (
          <TableViewAll
            key={i}
            turma={{ id: c.id, name: c.name, title: c.title }}
            grade={grade}
          />
        ))}
      </>
    </div>
  );
}
