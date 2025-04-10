import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useTransactions from "@/hooks/api/useTransactions";
import LoadingVal from "./LoadindVal";

export default function CardTransactions() {
  const { allTransactions, isLoadingAllTransactions } = useTransactions();
  return (
    <BaseBox className="p-4">
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-base dark:text-white font-bold">
            <CTranslateTo eng="Transactions" pt="Transações" />
          </h1>
          <ReactIcons.PiIcon.PiMoney size={15} className="text-green-500" />
        </div>
        <LoadingVal
          isLoading={isLoadingAllTransactions}
          val={allTransactions.length}
        />
      </div>
    </BaseBox>
  );
}
