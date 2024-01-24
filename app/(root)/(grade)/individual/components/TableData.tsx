"use client";
import { AddCircleIcon, TrashIcon } from "@/public/assets/icons";
import React, { useState } from "react";

type TableDataProps = {
  name?: string;
};

export default function TableData({ name }: TableDataProps) {
  return (
    <div
      className={`group relative flex h-12 min-w-full flex-col items-center justify-center border-b  border-r border-slate-900 text-center text-xs  sm:text-base`}
    >
      <span className="p-2 text-xs">{name}</span>
    </div>
  );
}
