import { BaseBox } from "@/@components/(box)/BaseBox";
import { IPodcast } from "@/http/interfaces/models/IPodCast";
import { ReactIcons } from "@/utils/icons";
import { YouTubeEmbed } from "@next/third-parties/google";

import DateCategory from "../../../components/DateCategory";

export default function PodContent({ podflex }: { podflex: IPodcast }) {
  return (
    <BaseBox className="flex-1 md:p-8 p-0 md:mb-8 mb-0 md:rounded-xl rounded-none flex flex-col md:gap-4 gap-2 dark:bg-ausoft-slate-900 ">
      <div className="w-full rounded-xl">
        <YouTubeEmbed
          videoid={podflex.url}
          style={
            window.innerWidth > 765
              ? "width: 100%; height: 100%; border-radius: 10px;"
              : "width: 100%; height: 100%;"
          }
        />
      </div>
      <div className="flex flex-col gap-4 md:p-0 p-4">
        <div className="flex items-center gap-3 flex-wrap border-b pb-4 border-slate-300 dark:border-slate-700/60">
          <DateCategory
            right
            category_name={
              podflex?.category ? podflex.category.name : "-------"
            }
            date={podflex.started_at}
          />
          <h4 className="flex items-center gap-2 dark:text-slate-300">
            <ReactIcons.Hi2Icon.HiClock size={15} />
            {podflex.duration}
          </h4>
        </div>
        <div
          className="dark:text-slate-300 text-base"
          dangerouslySetInnerHTML={{ __html: podflex.description }}
        ></div>
      </div>
    </BaseBox>
  );
}
