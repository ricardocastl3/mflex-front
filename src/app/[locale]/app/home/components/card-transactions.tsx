import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useTransactions from "@/hooks/api/useTransactions";

export default function CardCategories() {
  // Contexts
  const { allTransactions } = useTransactions({ route: "transaction" });

  return (
    <BaseBox className="p-4 flex flex-col gap-4">
      <h4 className="text-normal text-slate-600 dark:text-slate-400 flex items-center gap-2">
        <span className="rounded-full p-1 mb-1 bg-yellow-500 text-white">
          <ReactIcons.BiIcon.BiStar size={8} />
        </span>
        <CTranslateTo eng="Transactions" pt="Transações" />
      </h4>
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4 w-fit py-0.5 ml-1 dark:text-white rounded-full text-sm">
          <h4 className="text-2xl font-bold dark:text-white">
            {allTransactions.length}
          </h4>
          <h4 className="mt-0.5 dark:text-slate-400 text-slate-600">
            <CTranslateTo eng="In your total" pt="No seu total " />
          </h4>
        </div>
      </div>
    </BaseBox>
  );
}
