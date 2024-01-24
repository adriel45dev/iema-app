import React from "react";

export default function TableIndividual() {
  return (
    <table className="w-full border text-center uppercase">
      <thead>
        <tr className="border-b">
          <th scope="col" className="border-r"></th>
          <th scope="col" colSpan={2} className="border-r">
            Segunda
          </th>
          <th scope="col" colSpan={2} className="border-r">
            Terça
          </th>
          <th scope="col" colSpan={2} className="border-r">
            Quarta
          </th>
          <th scope="col" colSpan={2} className="border-r">
            Quinta
          </th>
          <th scope="col" colSpan={2} className="border-r">
            Sexta
          </th>
        </tr>
        <tr className="border-b">
          <th scope="col" className="border-r">
            HORÁRIOS
          </th>
          <th scope="col" className="border-r">
            Turma
          </th>
          <th scope="col" className="border-r">
            Componente
          </th>
          <th scope="col" className="border-r">
            Turma
          </th>
          <th scope="col" className="border-r">
            Componente
          </th>
          <th scope="col" className="border-r">
            Turma
          </th>
          <th scope="col" className="border-r">
            Componente
          </th>
          <th scope="col" className="border-r">
            Turma
          </th>
          <th scope="col" className="border-r">
            Componente
          </th>
          <th scope="col" className="border-r">
            Turma
          </th>
          <th scope="col" className="border-r">
            Componente
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b">
          <th>1º</th>
          <th>101</th>
          <th>A</th>
          <th>101</th>
          <th>B</th>
          <th>101</th>
          <th>C</th>
          <th>101</th>
          <th>D</th>
          <th>101</th>
          <th>E</th>
        </tr>
      </tbody>
    </table>
  );
}
