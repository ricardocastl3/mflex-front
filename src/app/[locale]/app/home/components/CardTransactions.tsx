import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CardTransactions() {
  return (
    <BaseBox className="p-4">
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-base dark:text-white font-bold">
            <CTranslateTo eng="Transactions" pt="Transações" />
          </h1>
          <ReactIcons.PiIcon.PiMoney size={15} className="text-green-500" />
        </div>
        <h1 className="text-base text-yellow-600 dark:text-yellow-500">87</h1>
      </div>
    </BaseBox>
  );
}
