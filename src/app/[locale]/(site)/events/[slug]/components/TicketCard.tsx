import { AuSoftUI } from "@/@components/(ausoft)";
import { IEventTicket } from "@/http/interfaces/models/IEventTicket";
import { ReactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { langByCookies } from "@/http/axios/api";
import { useModal } from "@/providers/app/ModalProvider";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";
import { useEventTicketProvider } from "@/providers/features/EventTicketProvider";
import { setCookie } from "cookies-next";
import { appConfigs, ECOOKIES } from "@/utils/enums";

import CurrencyServices from "@/services/CurrencyServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function TicketCard({ ticket }: { ticket: IEventTicket }) {
  const [quantity, setQuantity] = useState(1);
  const [totalToPay, setTotalToPay] = useState(0);

  // Contexts
  const { userLogged } = useAuth();
  const { handleOpenModal } = useModal();
  const { handleSelectEventTicket } = useEventTicketProvider();
  const { handleSelectCustomerBuyed } = useCheckoutProvider();

  const router = useRouter();

  function handlePurchaseTicket() {
    if (!userLogged) {
      setCookie(ECOOKIES.AS_CHECKOUT_REDIRECT, ticket.event_id, {
        domain: appConfigs.domain,
      });
      router.push(`/${langByCookies}/sign-in`);
    } else {
      handleSelectCustomerBuyed({
        amount: totalToPay,
        quantity,
        ticket_id: ticket.id,
      });
      handleSelectEventTicket(ticket);
      handleOpenModal("angolan-payment-modal");
    }
  }

  useEffect(() => {
    const total = quantity * ticket.amount;
    setTotalToPay(total);
  }, [quantity]);

  return (
    <div className="md:p-8 p-5 flex flex-col gap-2 bg-slate-300/30 rounded-lg dark:bg-ausoft-slate-950">
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="md:text-xl text-lg dark:text-white">{ticket.name}</h1>
        <h1 className="md:text-xl text-lg font-bold dark:text-white">{`${CurrencyServices.decimal(
          totalToPay
        )} Kz`}</h1>
      </div>
      <div className="flex md:items-center gap-4 items-stretch md:flex-row flex-col justify-between">
        <div>
          {ticket.description != "" && (
            <>
              <h1 className="md:text-lg text-base dark:text-slate-400 text-slate-700">
                {ticket.description}
              </h1>
            </>
          )}
        </div>
        <div className="flex md:items-center gap-4 items-stretch md:flex-row flex-col">
          {ticket.status == "available" && (
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
                className="md:w-fit w-[4rem] md:py-2.5 py-3 justify-center"
                variant={"primary"}
                size={"sm"}
              >
                <ReactIcons.BiIcon.BiMinus size={15} />
              </AuSoftUI.UI.Button>
              <AuSoftUI.UI.TextField.Default
                value={quantity}
                readOnly={true}
                weight={"sm"}
                className="md:w-[4rem] font-bold md:text-[0.9rem] md:h-[36px] h-[39px] dark:text-white text-base w-full text-center"
              />

              <AuSoftUI.UI.Button
                onClick={() => setQuantity((state) => state + 1)}
                size={"sm"}
                className="md:w-fit w-[4rem] md:py-2.5 py-3 justify-center"
                variant={"primary"}
              >
                <ReactIcons.BiIcon.BiPlus size={15} />
              </AuSoftUI.UI.Button>
            </div>
          )}
          {ticket.status == "available" && (
            <AuSoftUI.UI.Button
              onClick={() => handlePurchaseTicket()}
              size={"sm"}
              className="md:w-fit w-full text-[0.95rem] items-center md:py-1.5 py-2"
              variant={"primary"}
            >
              <ReactIcons.BiIcon.BiCart size={15} />
              <CTranslateTo eng="Purchase" pt="Comprar" />
            </AuSoftUI.UI.Button>
          )}
          {ticket.status == "unavailable" && (
            <AuSoftUI.UI.Button
              size={"sm"}
              className="md:w-fit w-full text-[0.95rem] items-center md:py-1.5 py-2"
              variant={"destructive"}
            >
              <ReactIcons.BiIcon.BiLock size={15} />
              <CTranslateTo eng="Unavailable" pt="Indisponível" />
            </AuSoftUI.UI.Button>
          )}
        </div>
      </div>
    </div>
  );
}
