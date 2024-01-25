"use client";
import React, { useEffect, useState } from "react";

type DataTypeDef = {
  name: string;
  id: string;
};

type DataType = {
  name: string;
  id: string;
  professores?: DataTypeDef[];
};

type SelectProps = {
  title?: string;
  data: DataType[];
  dataSelected: DataType;
  setDataSelected: React.Dispatch<React.SetStateAction<DataTypeDef>>;
  professorSelected?: DataTypeDef;
  disabled?: boolean;
};

export default function Select({
  title,
  data,
  dataSelected,
  disabled,
  professorSelected,
  setDataSelected,
}: SelectProps) {
  const [filterDisciplinas, setFilterDisciplinas] = useState<DataTypeDef[]>([]);

  useEffect(() => {
    if (professorSelected) {
      const newData = data.filter(
        (d) => d.professores?.map((p) => p.id).includes(professorSelected.id),
      );
      setFilterDisciplinas(newData);
    }
  }, [professorSelected]);

  return (
    <select
      disabled={disabled}
      onChange={(e) =>
        setDataSelected({
          name: e.target.options[e.target.selectedIndex].text,
          id: e.target.value,
        })
      }
      value={dataSelected.id}
      className="w-full  rounded-lg border border-gray-600 bg-slate-800 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
    >
      {title && (
        <option value={-1} className="">
          {title.toUpperCase()}
        </option>
      )}

      {professorSelected && filterDisciplinas.length ? (
        <>
          <optgroup label={"****"} title="t">
            {filterDisciplinas.map((d) => (
              <option value={d.id} key={d.id}>
                {d.name}
              </option>
            ))}
          </optgroup>

          <optgroup label={"****"} title="t">
            {data
              .filter(
                (d) =>
                  !d.professores
                    ?.map((p) => p.id)
                    .includes(professorSelected.id),
              )
              .map((d, i) => (
                <option value={d.id} key={d.id}>
                  {d.name}
                </option>
              ))}
          </optgroup>
        </>
      ) : (
        <optgroup label={"****"}>
          {data.map((d, i) => (
            <option value={d.id} key={d.id}>
              {d.name}
            </option>
          ))}
        </optgroup>
      )}
    </select>
  );
}
