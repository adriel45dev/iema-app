"use client";

import React, { useEffect, useState } from "react";
import TableViewAll from "../components/TableViewAll";
import { GET_GRADE, TURMAS } from "@/app/constants";
import { GradeType } from "@/app/shared/type";

export default function View() {
  const [grade, setGrade] = useState<GradeType[][]>([]);

  /** GET DATA FROM LOCAL_STORAGE */
  useEffect(() => setGrade(GET_GRADE()), []);

  return (
    <>
      {TURMAS.map((c, i) => (
        <TableViewAll
          key={i}
          turma={{ id: c.id, name: c.name, title: c.title }}
          grade={grade}
        />
      ))}
    </>
  );
}
