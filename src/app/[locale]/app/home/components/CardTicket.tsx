import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CardTicket() {
  return (
    <BaseBox className="p-4">
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <h1 className="text-base dark:text-white font-bold">
            <CTranslateTo eng="Tickets" pt="Ingressos" />
          </h1>
          <ReactIcons.HiIcon.HiTicket size={12} className="dark:text-white" />
        </div>
        <h1 className="text-base text-yellow-600 dark:text-yellow-500">20</h1>
      </div>
    </BaseBox>
  );
}
