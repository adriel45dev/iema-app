import { EyeIcon } from "@/public/assets/icons";
import React from "react";

export default function Sincronizar() {
  return (
    <div className="flex h-screen w-screen flex-col items-center p-4">
      <div className="flex w-full items-center justify-center gap-2">
        <h2 className="text-2xl font-bold">Sincronizar</h2>
      </div>

      {/* AÇÕES */}
      {/**
       * 1 - Modo de sincronização: Manual / Automatica;
       * 2 - Intervalo de sincronização: 30min / 1h / 2h;
       **/}

      <div className="mt-8">Conta Google</div>
      <div className="w-full px-6 sm:px-20">
        <form className="mx-auto w-full">
          <div className="group mb-5">
            <label
              htmlFor="accessKey"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Código de Acesso
            </label>

            <div className="flex w-full items-center justify-center">
              <input
                type="password"
                id="accessKey"
                className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                required
              />

              <div className="group rounded-r-lg bg-slate-800 p-2 ">
                <EyeIcon className="h-6 w-6 text-white group-hover:text-sky-600" />
              </div>
            </div>

            <span className="hidden text-xs text-gray-400 group-focus-within:inline-block">
              * código fornecido pelo administrador.
            </span>
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-slate-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 "
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
