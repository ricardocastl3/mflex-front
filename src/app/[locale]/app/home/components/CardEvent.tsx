import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CardEvent() {
  return (
    <BaseBox className="p-4">
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base dark:text-white font-bold">
            <CTranslateTo eng="Events" pt="Eventos" />
          </h1>
          <ReactIcons.HiIcon.HiTicket size={15} className="text-cyan-500" />
        </div>
        <h1 className="text-base text-yellow-600 dark:text-yellow-500">55</h1>
      </div>
    </BaseBox>
  );
}
