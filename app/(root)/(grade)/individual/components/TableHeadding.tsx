import React from "react";

type TableHeaddingProps = {
  title: string;
  time?: string;
  abbr?: string;
};

export default function TableHeadding({
  title,
  time,
  abbr,
}: TableHeaddingProps) {
  return (
    <div className="flex h-12 min-w-full flex-col items-center justify-center  border-b border-r  border-slate-900 bg-white text-xs font-bold sm:text-base">
      <span className={abbr ? "hidden sm:inline-block" : ""}>{title}</span>

      {abbr && <span className="sm:hidden">{abbr}</span>}

      {time && (
        <span className="hidden text-sm font-normal sm:inline-block">
          {time}
        </span>
      )}
    </div>
  );
}
