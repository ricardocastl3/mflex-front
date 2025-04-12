import { BaseBox } from "@/@components/(box)/BaseBox";
import { langByCookies } from "@/http/axios/api";
import { INews } from "@/http/interfaces/models/INews";
import { IPodcast } from "@/http/interfaces/models/IPodCast";
import { ReactIcons } from "@/utils/icons";
import { YouTubeEmbed } from "@next/third-parties/google";
import { format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

export default function PodContent({ podflex }: { podflex: IPodcast }) {
  return (
    <BaseBox className="flex-1 md:p-8 p-0 md:mb-8 mb-0 flex flex-col gap-4 dark:bg-ausoft-slate-900 ">
      <div className="w-full rounded-xl">
        <YouTubeEmbed
          videoid="SEmT64SQITw"
          style="width: 100%; height: 100%; border-radius: 10px;"
        />
      </div>
      <div className="flex flex-col gap-4 md:p-0 p-4">
        <div className="flex items-center gap-3 flex-wrap border-b pb-4 border-slate-300 dark:border-slate-700/60">
          <h1 className="text-base font-bold dark:text-yellow-500 text-yellow-600">
            {podflex.category?.name}
          </h1>
          <h4 className="flex items-center gap-2 dark:text-slate-300">
            <ReactIcons.Hi2Icon.HiCalendar size={15} />
            {format(
              podflex.created_at,
              langByCookies === "pt"
                ? "d 'de' MMMM 'às' HH:mm"
                : "d MMMM 'at' HH:mm",
              { locale: langByCookies === "pt" ? ptBR : enUS }
            )}
          </h4>
          <h4 className="flex items-center gap-2 dark:text-slate-300">
            <ReactIcons.Hi2Icon.HiClock size={15} />
            {podflex.duration}
          </h4>
        </div>
        <div
          className="dark:text-slate-300 text-lg"
          dangerouslySetInnerHTML={{ __html: podflex.description }}
        ></div>
      </div>
    </BaseBox>
  );
}
