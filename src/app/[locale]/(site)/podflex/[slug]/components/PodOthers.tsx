import { IPodcast } from "@/http/interfaces/models/IPodCast";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import PodFlexCard from "../../components/container/PodFlexCard";

export default function PodOthers({
  podcasts,
  podElement,
}: {
  podElement: IPodcast;
  podcasts: IPodcast[];
}) {
  if (
    podcasts.filter(
      (i) => i.category?.id != podElement.category?.id && i.id != podElement.id
    ).length <= 0
  ) {
    return <></>;
  }

  return (
    <div className="md:py-10 py-10 md:px-[3rem] px-6 flex mt-5 flex-col gap-8 bg-slate-300/40 dark:bg-ausoft-slate-950 pt-2 border-t border-slate-300 dark:border-slate-800">
      <h1 className="dark:text-white text-xl font-bold md:pt-0 pt-8">
        <CTranslateTo eng="Others PodCasts" pt="Outros PodCasts" />
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 md:items-start items-start w-full md:gap-4 gap-6">
        {podcasts
          .filter(
            (i) =>
              i.category?.id != podElement.category?.id && i.id != podElement.id
          )
          .map((newEl, i) => {
            return i <= 2 && <PodFlexCard podcast={newEl} index={i} key={i} />;
          })}
      </div>
    </div>
  );
}
