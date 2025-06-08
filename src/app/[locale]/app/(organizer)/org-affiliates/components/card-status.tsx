import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CardStatus({ date }: { date: Date }) {
  const isEnded = new Date() > new Date(date) ? true : false;

  return (
    <div className="flex items-center gap-2">
      <h4
        className={`${
          !isEnded
            ? "text-green-700 dark:text-green-400 bg-green-200 dark:bg-green-800/40"
            : "text-yellow-700 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-800/40"
        } flex items-center gap-2 px-2 py-0.5 rounded-full`}
      >
        {isEnded && <ReactIcons.PiIcon.PiLockKey size={12} />}

        {!isEnded && <ReactIcons.PiIcon.PiCalendar size={12} />}

        <p className="text-xs font-bold">
          {!isEnded && <CTranslateTo eng="Active Event" pt="Evento Ativo" />}
          {isEnded && (
            <CTranslateTo eng="Event Finished" pt="Evento Encerrado" />
          )}
        </p>
      </h4>
    </div>
  );
}
