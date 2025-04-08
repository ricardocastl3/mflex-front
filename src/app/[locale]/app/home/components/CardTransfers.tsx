import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CardTransfers() {
  return (
    <BaseBox className="p-4">
      <div className="flex flex-col gap-2">
        <div className="w-full items-center flex justify-between">
          <h1 className="text-base dark:text-white font-bold">
            <CTranslateTo eng="Transfers" pt="Transferências" />
          </h1>
          <ReactIcons.AiICon.AiOutlineMoneyCollect
            size={15}
            className="text-yellow-500"
          />
        </div>
        <h1 className="text-base text-yellow-600 dark:text-yellow-500">20</h1>
      </div>
    </BaseBox>
  );
}
