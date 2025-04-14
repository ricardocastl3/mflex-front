import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

export default function DateCategory({
  category_name,
  date,
  right,
}: {
  category_name: string;
  date: Date;
  right?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {!right && (
        <h1 className="flex items-center gap-2 text-base dark:text-yellow-500 text-yellow-600">
          <ReactIcons.VSCIcon.VscAzureDevops size={15} />
          {`${category_name}`}
        </h1>
      )}

      <h4 className="flex items-center gap-2 dark:text-slate-300">
        <ReactIcons.Hi2Icon.HiCalendar size={15} />
        {format(
          date,
          langByCookies === "pt"
            ? "d 'de' MMMM 'às' HH:mm"
            : "d MMMM 'at' HH:mm",
          { locale: langByCookies === "pt" ? ptBR : enUS }
        )}
      </h4>

      {right && (
        <h1 className="flex items-center gap-2 text-base dark:text-yellow-500 text-yellow-600">
          <ReactIcons.VSCIcon.VscAzureDevops size={15} />
          {category_name == "no" && (
            <CTranslateTo eng="No Category" pt="Sem categoria" />
          )}

          {category_name != "no" && <>{`${category_name}`}</>}
        </h1>
      )}
    </div>
  );
}
