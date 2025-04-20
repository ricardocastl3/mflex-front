import { INews } from "@/http/interfaces/models/INews";

import NewsCard from "../../components/container/NewsCard";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function NewsOthers({
  news,
  newElement,
}: {
  newElement: INews;
  news: INews[];
}) {
  if (
    news.filter(
      (i) => i.category?.id != newElement.category?.id && i.id != newElement.id
    ).length <= 0
  ) {
    return <></>;
  }

  return (
    <div className="md:py-10 py-10 md:px-[3rem] px-6 flex mt-5 flex-col gap-8 bg-slate-300/40 dark:bg-ausoft-slate-950 pt-2 border-t border-slate-300 dark:border-slate-800">
      <h1 className="dark:text-white text-xl font-bold md:pt-0 pt-8">
        <CTranslateTo eng="Oher news" pt="Outras novidades" />
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 md:items-center items-start w-full md:gap-4 gap-6">
        {news
          .filter(
            (i) =>
              i.category?.id != newElement.category?.id && i.id != newElement.id
          )
          .map((newEl, i) => {
            return i <= 2 && <NewsCard news={newEl} index={i} key={i} />;
          })}
      </div>
    </div>
  );
}
