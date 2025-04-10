import { AuSoftUI } from "@/@components/(ausoft)";
import { IEventTicket } from "@/http/interfaces/models/EventTicket";
import { ReactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";

import CurrencyServices from "@/services/CurrencyServices";

export default function TicketCard({ ticket }: { ticket: IEventTicket }) {
  const [quantity, setQuantity] = useState(1);
  const [totalToPay, setTotalToPay] = useState(0);

  useEffect(() => {
    const total = quantity * ticket.amount;
    setTotalToPay(total);
  }, [quantity]);

  return (
    <div className="md:p-8 p-5 flex flex-col gap-2 bg-slate-300/30 rounded-lg dark:bg-ausoft-slate-950">
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="text-xl">{ticket.name}</h1>
        <h1 className="text-xl font-bold">{`${CurrencyServices.decimal(
          totalToPay
        )} Kz`}</h1>
      </div>
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <AuSoftUI.UI.Button
            onClick={() =>
              setQuantity((state) => {
                if (state > 1) {
                  return state - 1;
                }
                return 1;
              })
            }
            className="md:w-fit w-[5rem]"
            variant={"primary"}
            size={"sm"}
          >
            <ReactIcons.BiIcon.BiMinus size={15} />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.TextField.Default
            value={quantity}
            disabled={true}
            weight={"sm"}
            className="md:w-[2rem] w-full text-center"
          />

          <AuSoftUI.UI.Button
            onClick={() => setQuantity((state) => state + 1)}
            size={"sm"}
            className="md:w-fit w-[4rem]"
            variant={"primary"}
          >
            <ReactIcons.BiIcon.BiPlus size={15} />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </div>
  );
}
