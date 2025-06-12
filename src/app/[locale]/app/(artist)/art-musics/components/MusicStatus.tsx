import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function MusicStatus({ status }: { status: string }) {
  return (
    <>
      {status == "pending" && (
        <h1 className="h-fit w-fit text-xs gap-2 px-2 py-0.5 rounded-full bg-yellow-200 dark:bg-yellow-800/40 dark:text-yellow-400 text-yellow-800 flex items-center">
          <ReactIcons.HiIcon.HiTicket size={18} />
          <CTranslateTo eng="Pending Music" pt="Música Pendente" />
        </h1>
      )}
      {status == "online" && (
        <h1 className="h-fit w-fit text-xs gap-2 px-2 py-0.5 rounded-full bg-green-200 dark:bg-green-800/40 dark:text-green-400 text-green-800 flex items-center">
          <ReactIcons.HiIcon.HiTicket size={18} />
          <CTranslateTo eng="Online" pt="Online" />
        </h1>
      )}
      {status == "offline" && (
        <h1 className="h-fit w-fit text-xs gap-2 px-2 py-0.5 rounded-full bg-red-200 dark:bg-red-800/40 dark:text-red-400 text-red-800 flex items-center">
          <ReactIcons.HiIcon.HiTicket size={18} />
          <CTranslateTo eng="Offline" pt="Offline" />
        </h1>
      )}
    </>
  );
}
