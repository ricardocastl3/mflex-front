import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LoadingVal from "./LoadindVal";
import useDonations from "@/hooks/api/musics/useDonations";

export default function CardDonations() {
  const { allDonations, isLoadingAllDonations } = useDonations({
    route: "general",
  });
  return (
    <BaseBox className="p-4">
      <div className="flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base dark:text-white font-bold">
            <CTranslateTo eng="Donations" pt="Minhas doações" />
          </h1>
          <ReactIcons.FaIcon.FaDonate size={15} className="text-emerald-500" />
        </div>

        <LoadingVal
          isLoading={isLoadingAllDonations}
          val={allDonations.total}
        />
      </div>
    </BaseBox>
  );
}
