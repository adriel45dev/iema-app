import Image from "next/image";
import TableDisplay from "../components/TableDisplay";
import { TURMAS } from "@/app/constants";

export default function Print() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 ">
      {TURMAS.map((turma) => (
        <div className="page flex items-center justify-center">
          <div className="flex h-full w-full flex-col">
            <div className="flex w-full items-center justify-between p-4 font-bold">
              <div className="flex flex-col items-center justify-center">
                <div>HORÁRIO DE AULAS – IP PRESIDENTE DUTRA</div>
                <div>
                  TURMA: {turma.id} - {turma.title}
                </div>
              </div>
              <div className="relative h-14 w-96">
                {" "}
                <Image
                  src={"/assets/imgs/logo_iema_transparent.png"}
                  objectFit="cover"
                  fill
                  alt="logo"
                />
              </div>
            </div>
            <TableDisplay turma={turma.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
