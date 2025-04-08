import { AuSoftUI } from "@/@components/(ausoft)";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CurrencyServices from "@/services/CurrencyServices";
import { ReactIcons } from "@/utils/icons";

export default function TicketCard() {
  return (
    <div className="dark:bg-ausoft-slate-900 bg-white rounded-xl p-4 flex md:flex-row flex-col gap-3">
      <div className="flex md:justify-start justify-center">
        <div
          style={{
            width: window.innerWidth > 765 ? "120px" : "100%",
            objectFit: "fill",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundImage: `url(https://img.freepik.com/free-psd/black-friday-super-sale-instagram-facebook-story-banner-template_106176-1631.jpg?t=st=1743867072~exp=1743870672~hmac=1610e61a32604cd2b554b1f86fa426d8f7b4d891a58ad7e4b4420adf880af20e&w=740)`,
          }}
          className="rounded-xl md:h-full h-[150px]"
        ></div>
      </div>
      <div className="flex-1 flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <h4 className="dark:text-white text-lg font-bold">
            2ª Edição - Festa dos pequeninos
          </h4>

          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="flex items-center gap-2 dark:text-yellow-400 text-yellow-700 text-base">
              <ReactIcons.HiIcon.HiCurrencyDollar size={18} />
              {CurrencyServices.decimal(254000)} Kz - {` Área VIP`}
            </h1>
            <h1 className="md:flex hidden text-base dark:text-slate-400 text-slate-600">|</h1>
            <h1 className="flex items-center gap-2 dark:text-slate-300">
              <b>2</b>
              <CTranslateTo eng="Tickets" pt="Ingressos" />
              <ReactIcons.HiIcon.HiTicket size={18} />
            </h1>
            <h1 className="flex items-center gap-2 dark:text-yellow-400 text-yellow-700 text-base">
              <ReactIcons.HiIcon.HiCalendar size={18} />
              <CTranslateTo eng="Past Event" pt="Evento Passado" />
            </h1>
          </div>
        </div>
        <div>
          <AuSoftUI.UI.Button
            variant={"primary"}
            className="items-center md:w-fit w-full"
          >
            <ReactIcons.AiICon.AiOutlineQrcode size={12} />
            <CTranslateTo eng="View Access Code" pt="Ver código de acesso" />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </div>
  );
}
