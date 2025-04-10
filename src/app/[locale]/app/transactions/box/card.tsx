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
    <BaseBox className="md:p-4 p-3 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex md:flex-row flex-col md:items-center items-start gap-2 md:justify-between justify-start">
          <Icon
            size={window.innerWidth > 765 ? 20 : 14}
            className={`${iconColor} md:hidden flex`}
          />
          <h4 className="md:text-base text-sm text-slate-600 dark:text-slate-300">
            <CTranslateTo eng={title_en} pt={title_pt} />
          </h4>
          <Icon size={20} className={`${iconColor} md:flex hidden`} />
        </div>

        <h4 className="md:text-xl text-sm font-bold text-yellow-500 dark:text-yellow-300">
          {currency && `${CurrencyServices.decimal(value)} Kz`}
          {!currency && value}
        </h4>
      </div>
    </BaseBox>
  );
}
