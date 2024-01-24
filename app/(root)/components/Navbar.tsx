"use client";
import React, { useState } from "react";
import {
  BackupIcon,
  ClipboardIcon,
  CourseIcon,
  EyeIcon,
  MenuDotsIcon,
  TeacherIcon,
  UsersIcon,
} from "@/public/assets/icons";
import Link from "next/link";

type MenuItemProps = {
  children: React.ReactNode;
  title: string;
};
const MenuItem = ({ children, title }: MenuItemProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg p-2 hover:bg-blue-500">
      {children}
      <span className="text-xs">{title}</span>
    </div>
  );
};

export default function Navbar() {
  const [btnToogleActive, setBtnToogleActive] = useState(false);
  return (
    <>
      <div className="flex w-full justify-between bg-slate-800 px-6 py-4">
        <Link
          href={"/"}
          className="text-lg font-bold text-white hover:text-orange-500 "
        >
          IEMA
        </Link>

        <div
          className="cursor-pointer text-white hover:text-orange-500"
          onClick={() => setBtnToogleActive((prev) => !prev)}
        >
          <MenuDotsIcon
            className={`h-8 w-8 ${
              btnToogleActive ? "rotate-90 text-orange-500" : "rotate-0"
            }`}
          />
        </div>
      </div>

      <div
        className={`absolute right-0 top-16 mr-2  min-h-screen  w-max rounded-2xl duration-300 ease-in-out ${
          btnToogleActive ? "z-50 opacity-100" : "-z-50 opacity-0"
        }`}
      >
        <div className="mt-1 flex h-max w-full flex-col items-center justify-center gap-2 rounded-2xl bg-slate-800 p-2 text-white">
          <Link href={"/grade"}>
            <MenuItem title="Horário">
              <ClipboardIcon className=" h-8 w-8 text-orange-400 " />
            </MenuItem>
          </Link>

          <Link href={"/individual"}>
            <MenuItem title="Individual">
              <TeacherIcon className=" h-8 w-8 text-orange-400 " />
            </MenuItem>
          </Link>

          <Link href={"/disciplinas"}>
            <MenuItem title="Disciplinas">
              <CourseIcon className=" h-8 w-8 text-orange-400 " />
            </MenuItem>
          </Link>

          <Link href={"/professores"}>
            <MenuItem title="Professores">
              <UsersIcon className="h-8 w-8 text-orange-400 " />
            </MenuItem>
          </Link>

          <Link href={"/backup"}>
            <MenuItem title="Backup">
              <BackupIcon className="h-8 w-8 text-orange-400 " />
            </MenuItem>
          </Link>
        </div>
      </div>
    </>
  );
}
