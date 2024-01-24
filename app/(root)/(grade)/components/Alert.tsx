import React from "react";

const InfoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      viewBox="0 0 14 14"
      className="h-3 w-3"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
  );
};

export type AlertTypeData = {
  message: string;
  type: AlertType;
  state: boolean;
};

type AlertProps = {
  alertAction: AlertTypeData;
  setAlertAction: React.Dispatch<React.SetStateAction<AlertTypeData>>;
};

export enum AlertType {
  info = "info",
  danger = "danger",
  success = "success",
  warning = "warning",
  light = "light",
}

enum AlertStyle {
  info = "bg-blue-100 text-blue-800",
  danger = "bg-red-100 text-red-800",
  success = "bg-green-100 text-green-800 ",
  warning = "bg-yellow-100 text-yellow-800 ",
  light = "bg-gray-100 text-slate-800",
}

enum AlertStyleButton {
  info = "bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200",
  danger = "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200",
  success = "bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200",
  warning = "bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200",
  light = "bg-gray-50 text-slate-500 focus:ring-slate-400 hover:bg-slate-200",
}

export const AlertDefaultData = {
  message: "...",
  type: AlertType.danger,
  state: false,
};

export default function Alert({ alertAction, setAlertAction }: AlertProps) {
  const { message, type, state } = alertAction;

  const handleCloseDiolog = () => {
    setAlertAction({ ...alertAction, state: false });
  };

  return state ? (
    <div
      id="alert-1"
      className={`mb-4 flex w-full items-center rounded-lg p-4 ${AlertStyle[type]}`}
      role="alert"
    >
      <InfoIcon />
      <span className="sr-only">Info</span>
      <div className="ms-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        className={`-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg p-1.5 focus:ring-2  ${AlertStyleButton[type]}`}
        data-dismiss-target="#alert-1"
        aria-label="Close"
        onClick={handleCloseDiolog}
      >
        <span className="sr-only">Close</span>
        <CloseIcon />
      </button>
    </div>
  ) : null;
}
