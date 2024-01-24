import React from "react";
import TableIndividual from "./components/TableIndividual";

export default function Individual2() {
  return (
    <div className="flex min-h-screen w-full  flex-col items-center p-4 pb-16">
      <div className="flex items-center justify-center gap-2 p-4 text-2xl ">
        <span className="font-bold">HORÁRIO INDIVIDUAL</span>
        <span className="text-lg"> | {""}</span>
      </div>
      <TableIndividual />
    </div>
  );
}
