import React from "react";

type TableDataIntervalProps = {
  title?: string;
};

export default function TableDataInterval({ title }: TableDataIntervalProps) {
  return (
    <div className="flex h-5 w-full items-center justify-start border-b border-slate-900 bg-[#F1DBDB] py-1 text-xs font-bold  sm:text-base">
      {title}
    </div>
  );
}
