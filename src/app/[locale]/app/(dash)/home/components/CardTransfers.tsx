import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useOrganizerTransfers from "@/hooks/api/panels/organizer/useOrganizerTransfers";
import LoadingVal from "./LoadindVal";

export default function CardTransfers() {
  const { allTransfer, isLoadingAllTransfer } = useOrganizerTransfers();
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
        <LoadingVal isLoading={isLoadingAllTransfer} val={allTransfer.total} />
      </div>
    </BaseBox>
  );
}
