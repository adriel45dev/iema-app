import React, { ButtonHTMLAttributes } from "react";

export enum ButtonType {
  primary = "primary",
  success = "success",
  orange = "orange",
  purple = "purple",
}

enum ButtonStyle {
  primary = "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800",
  orange = "bg-orange-600 hover:bg-orange-700 focus:ring-orange-800",
  success = "bg-green-600 hover:bg-green-700 focus:ring-green-800",
  purple = "bg-purple-600 hover:bg-purple-700 focus:ring-purple-800",
}

type ButtonProps = {
  children: React.ReactNode;
  btnTitle?: string;
  btnType?: ButtonType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  btnTitle,
  btnType,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type="button"
      className={`${
        btnType &&
        `mb-2 me-2 flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 ${ButtonStyle[btnType]}`
      }`}
    >
      {children}
      <span className="hidden sm:inline-block">{btnTitle}</span>
    </button>
  );
}
