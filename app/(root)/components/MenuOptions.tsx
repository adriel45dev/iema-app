import React from "react";

type MenuOptionProp = {
  title: string;
  children: React.ReactNode;
};

export default function MenuOptions({ title, children }: MenuOptionProp) {
  return (
    <div className="group flex min-w-max flex-col items-center justify-center gap-4 rounded-2xl border border-slate-800 px-1 py-4 font-bold text-slate-700 hover:scale-105 hover:bg-slate-800">
      <div className="group-hover:text-orange-500">{children}</div>
      <div className="flex min-w-full justify-center group-hover:text-white">
        <span className="flex-wrap break-words uppercase">{title}</span>
      </div>
    </div>
  );
}
