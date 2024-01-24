import React from "react";

type TableDataIntervalProps = {
  title?: string;
};

export default function TableDataInterval({ title }: TableDataIntervalProps) {
  return (
    <div className="flex h-4 w-full items-center justify-center border-b border-slate-900 bg-sky-600  text-xs  font-bold  sm:text-base">
      {title}
    </div>
  );
}
