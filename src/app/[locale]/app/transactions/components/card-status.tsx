import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { ReactIcons } from "@/utils/icons";

export default function CardStatus({ status }: { status: string }) {
  return (
    <>
      {status == "success" && (
        <>
          <div className="flex items-center gap-4">
            <span className="text-xl mb-1 dark:text-green-400 text-green-700 w-5 h-5 flex items-center justify-center rounded-full dark:bg-green-900/50 bg-green-300">
              <ReactIcons.BiIcon.BiUpArrowAlt className={"rotate-180"} />
            </span>
            <h3 className="text-sm  dark:text-green-400 text-green-700">
              <CTranslateTo pt={"Sucesso"} eng={"Success"} />
            </h3>
          </div>
        </>
      )}

      {status == "failed" && (
        <>
          <div className="flex items-center gap-4">
            <span className="text-xl mb-1 dark:text-red-400 text-red-700 w-5 h-5 flex items-center justify-center rounded-full dark:bg-red-900/50 bg-red-300">
              <ReactIcons.BiIcon.BiUpArrowAlt />
            </span>
            <h3 className="text-sm dark:text-red-400 text-red-700">
              <CTranslateTo pt={"Falhou"} eng={"Failed"} />
            </h3>
          </div>
        </>
      )}

      {status == "pending" && (
        <>
          <div className="flex items-center gap-4">
            <span className="text-xl mb-1 dark:text-yellow-400 text-yellow-700 w-5 h-5 flex items-center justify-center rounded-full dark:bg-yellow-900/50 bg-yellow-300">
              <ReactIcons.BiIcon.BiUpArrowAlt />
            </span>
            <h3 className="text-sm dark:text-yellow-400 text-yellow-700">
              <CTranslateTo pt={"Pendente"} eng={"Pending"} />
            </h3>
          </div>
        </>
      )}
    </>
  );
}
