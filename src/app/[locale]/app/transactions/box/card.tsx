import { BaseBox } from "@/@components/(box)/BaseBox";
import { IconType } from "react-icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CurrencyServices from "@/services/CurrencyServices";

export default function CardDashboard({
  title_en,
  title_pt,
  Icon,
  iconColor,
  value,
  currency = false,
}: {
  Icon: IconType;
  iconColor: string;
  title_pt: string;
  title_en: string;
  value: number;
  currency?: boolean;
}) {
  return (
    <BaseBox className="p-4 w-full">
      <div className="flex flex-col gap-2 items-center">
        <Icon size={20} className={`${iconColor}`} />
        <h4 className="md:text-sm text-xs text-slate-600 dark:text-slate-300">
          <CTranslateTo eng={title_en} pt={title_pt} />
        </h4>
        <h4 className="md:text-xl text-xs font-bold text-blue-500 dark:text-blue-300 text-center">
          {currency && `${CurrencyServices.decimal(value)} Kz`}
          {!currency && value}
        </h4>
      </div>
    </BaseBox>
  );
}
