import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { ITransfer } from "@/http/interfaces/models/ITransfer";
import { IAffiliate } from "@/http/interfaces/models/IAffiliate";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CurrencyServices from "@/services/CurrencyServices";
import RequestAffiliation from "./RequestAffiliation";

export default function BoxAffliateInfo({
  affiliations,
  commissions,
}: {
  commissions: ITransfer[];
  affiliations: IAffiliate[];
}) {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 h-full">
      <BaseBox className="md:p-4 p-3 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row md:items-center items-start gap-2 md:justify-start justify-between">
            <h4 className="md:text-base text-[0.9rem] text-slate-600 dark:text-slate-300">
              <CTranslateTo eng={"Gains"} pt={"Ganhos"} />
            </h4>
            <ReactIcons.MdIcon.MdWallet
              size={window.innerWidth > 765 ? 17 : 17}
              className="dark:text-green-500 text-green-500"
            />
          </div>

          <h4 className="md:text-xl text-base font-bold text-yellow-500 dark:text-yellow-300">
            {`${
              commissions.length > 0
                ? CurrencyServices.decimal(
                    commissions.reduce(
                      (acc, curr) => acc + Number(curr.payment.amount),
                      0
                    )
                  )
                : 0
            } Kz`}
          </h4>
        </div>
      </BaseBox>
      <BaseBox className="md:p-4 p-3 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row md:items-center items-start gap-2 md:justify-start justify-between">
            <h4 className="md:text-base text-[0.9rem] text-slate-600 dark:text-slate-300">
              <CTranslateTo eng={"Active Events"} pt={"Eventos ativos"} />
            </h4>
            <ReactIcons.MdIcon.MdCalendarMonth
              size={window.innerWidth > 765 ? 17 : 17}
              className="dark:text-blue-500 text-blue-500"
            />
          </div>

          <h4 className="md:text-xl text-base font-bold text-yellow-500 dark:text-yellow-300">
            {`${affiliations.length}`}
          </h4>
        </div>
      </BaseBox>

      <RequestAffiliation />
    </div>
  );
}
