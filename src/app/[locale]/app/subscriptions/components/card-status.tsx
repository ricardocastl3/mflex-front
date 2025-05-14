import CTranslateTo from "@/@components/(translation)/CTranslateTo";

import { ReactIcons } from "@/utils/icons";

export default function CardSubsStatus({
  isExpired,
}: {
  isExpired: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <h4
        className={`${
          !isExpired
            ? "text-yellow-700 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-800/40"
            : "text-red-700 dark:text-red-400 bg-red-200 dark:bg-red-800/40"
        } flex items-center gap-2 px-2 py-0.5 rounded-full`}
      >
        {isExpired && <ReactIcons.PiIcon.PiLockKey size={12} />}
        {!isExpired && <ReactIcons.PiIcon.PiLockKeyOpen size={12} />}

        <p className="text-xs font-bold">
          {!isExpired && <CTranslateTo eng="Active" pt="Ativo" />}
          {isExpired && <CTranslateTo eng="Expired" pt="Expirado" />}
        </p>
      </h4>
    </div>
  );
}
