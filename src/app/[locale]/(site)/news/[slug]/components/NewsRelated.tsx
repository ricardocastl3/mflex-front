import { INews } from "@/http/interfaces/models/INews";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { localImages } from "@/utils/images";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import NewsCard from "../../components/container/NewsCard";
import Image from "next/image";

export default function NewsRelated({
  news,
  newElement,
}: {
  newElement: INews;
  news: INews[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <BaseBox className="p-4 dark:bg-ausoft-slate-900 dark:text-white font-bold text-lg">
        <CTranslateTo eng="Related News" pt="Novidades Relacionadas" />
      </BaseBox>
      <div className="flex flex-col gap-4 md:w-[20rem] w-full">
        {news.filter(
          (i) =>
            i.category?.id == newElement.category?.id && i.id != newElement.id
        ).length <= 0 && (
          <BaseBox className="flex flex-col items-center gap-2 p-8 text-center font-bold dark:text-white">
            <Image
              alt=""
              width={50}
              height={50}
              src={localImages.vectors.emptyBox}
            />
            <CTranslateTo
              eng="No related news"
              pt="Sem novidades relacionadas"
            />
          </BaseBox>
        )}

        {news
          .filter(
            (i) =>
              i.category?.id == newElement.category?.id && i.id != newElement.id
          )
          .map((newEl, i) => {
            return i < 2 && <NewsCard index={i} key={i} news={newEl} />;
          })}
      </div>
    </div>
  );
}
