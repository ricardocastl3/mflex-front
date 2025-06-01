import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { ReactIcons } from "@/utils/icons";

export default function EventStatus({ status }: { status: string }) {
  return (
    <>
      {status == "pending" && (
        <h1 className="text-yellow-400 flex items-center gap-2 text-sm">
          <ReactIcons.HiIcon.HiTicket size={18} />
          <CTranslateTo eng="Pending Event" pt="Evento Pendente" />
        </h1>
      )}
      {status == "approved" && (
        <h1 className="text-green-400 flex items-center gap-2 text-sm">
          <ReactIcons.HiIcon.HiTicket size={18} />
          <CTranslateTo eng="Approved Event" pt="Evento Aprovado" />
        </h1>
      )}
      {status == "rejected" && (
        <h1 className="text-red-400 flex items-center gap-2 text-sm">
          <ReactIcons.HiIcon.HiTicket size={18} />
          <CTranslateTo eng="Rejected Event" pt="Evento Rejeitado" />
        </h1>
      )}
    </>
  );
}
