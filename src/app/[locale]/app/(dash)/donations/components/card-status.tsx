import CTranslateTo from "@/@components/(translation)/CTranslateTo";

import { ReactIcons } from "@/utils/icons";

export default function CardStatus({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-2">
      <h4
        className={`${
          status == "success"
            ? "text-green-700 dark:text-green-400 bg-green-200 dark:bg-green-800/40"
            : status == "failed"
            ? "text-red-700 dark:text-red-400 bg-red-200 dark:bg-red-800/40"
            : "text-yellow-700 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-800/40"
        } flex items-center gap-2 px-2 py-0.5 rounded-full`}
      >
        {status == "success" && <ReactIcons.PiIcon.PiLockKey size={12} />}
        {status == "failed" && <ReactIcons.PiIcon.PiLockKeyOpen size={12} />}
        {status == "pending" && <ReactIcons.PiIcon.PiLockKeyOpen size={12} />}

        <p className="text-xs font-bold">
          {status == "success" && <CTranslateTo eng="Success" pt="Sucesso" />}
          {status == "pending" && <CTranslateTo eng="Pending" pt="Pendente" />}
          {status == "failed" && (
            <>
              {window.innerWidth > 765 && (
                <CTranslateTo eng="Failed" pt="Falhou" />
              )}
              {window.innerWidth < 765 && (
                <CTranslateTo eng="Failed" pt="Falhou" />
              )}
            </>
          )}
        </p>
      </h4>
    </div>
  );
}
