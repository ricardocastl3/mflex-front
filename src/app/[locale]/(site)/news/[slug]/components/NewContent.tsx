import { BaseBox } from "@/@components/(box)/BaseBox";
import { langByCookies } from "@/http/axios/api";
import { INews } from "@/http/interfaces/models/INews";
import { ReactIcons } from "@/utils/icons";
import { format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

export default function NewContent({ news }: { news: INews }) {
  return (
    <BaseBox className="flex-1 md:p-8 p-4 flex flex-col md:mb-8 mb-0 gap-4 dark:bg-ausoft-slate-900 ">
      <div
        style={{
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${news.image_url})`,
          height: window.innerWidth > 765 ? "400px" : "300px",
          width: "100%",
        }}
        className="rounded-xl"
      ></div>
      <div className="flex items-center gap-3 flex-wrap  border-b pb-4 border-slate-300 dark:border-slate-700/60">
        <h1 className="text-base font-bold dark:text-yellow-500 text-yellow-600">
          {news.category?.name}
        </h1>
        <h4 className="flex items-center gap-2 dark:text-slate-300">
          <ReactIcons.Hi2Icon.HiCalendar size={15} />
          {format(
            news.created_at,
            langByCookies === "pt"
              ? "d 'de' MMMM 'às' HH:mm"
              : "d MMMM 'at' HH:mm",
            { locale: langByCookies === "pt" ? ptBR : enUS }
          )}
        </h4>
      </div>
      <div
        className="dark:text-slate-300 text-lg"
        dangerouslySetInnerHTML={{ __html: news.content }}
      ></div>
    </BaseBox>
  );
}
