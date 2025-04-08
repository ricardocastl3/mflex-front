import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function EventCard() {
  const { handleOpenModal } = useModal();

  return (
    <div className="flex flex-col gap-2">
      <div
        style={{
          width: window.innerWidth > 765 ? "100%" : "100%",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(https://img.freepik.com/free-psd/black-friday-super-sale-instagram-facebook-story-banner-template_106176-1631.jpg?t=st=1743867072~exp=1743870672~hmac=1610e61a32604cd2b554b1f86fa426d8f7b4d891a58ad7e4b4420adf880af20e&w=740)`,
        }}
        className="rounded-xl md:h-[400px] h-[400px] flex flex-col justify-between"
      >
        <div className="p-4 flex flex-col gap-1 bg-black/80 rounded-t-xl h-fit">
          <div className="flex items-center gap-4">
            <h1 className="text-yellow-400 flex items-center gap-2 text-sm">
              <ReactIcons.HiIcon.HiTicket size={18} />
              <CTranslateTo eng="Pending Event" pt="Evento Pendente" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="flex items-start text-sm gap-2 text-white">
              <ReactIcons.HiIcon.HiCalendar size={18} />
              2ª Edição - Festa dos pequeninos
            </h1>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="py-1 px-4 flex items-center gap-2">
            <AuSoftUI.UI.Button
              variant={"destructive"}
              className="py-1.5 items-center justify-center gap-1 px-2 w-full"
              size={"sm"}
            >
              <ReactIcons.PiIcon.PiTrash size={15} />
              <CTranslateTo eng="Delete" pt="Eliminar" />
            </AuSoftUI.UI.Button>
            <AuSoftUI.UI.Button
              onClick={() => handleOpenModal("add-event")}
              variant={"primary"}
              className="py-1.5 items-center justify-center gap-1 px-2 w-full"
              size={"sm"}
            >
              <ReactIcons.HiIcon.HiPencilAlt size={15} />
              <CTranslateTo eng="Edit" pt="Editar" />
            </AuSoftUI.UI.Button>
          </div>

          <div className="p-4 bg-black/50 rounded-b-xl h-fit">
            <div className="flex items-center gap-2">
              <AuSoftUI.UI.Button
                onClick={() => handleOpenModal("list-ticket")}
                variant={"default"}
                className="w-full font-bold items-center "
                size={"sm"}
              >
                <ReactIcons.HiIcon.HiTicket size={18} />
                <CTranslateTo eng="View tickets" pt="Ver ingressos" />
              </AuSoftUI.UI.Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
