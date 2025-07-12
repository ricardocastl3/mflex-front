import { BaseBox } from "@/@components/(box)/BaseBox";
import { INews } from "@/http/interfaces/models/INews";

import DateCategory from "../../../components/DateCategory";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LikeResourceButton from "../../../components/likes/LikeResourceButton";
import ShareButtonResource from "../../../components/shares/ShareButtonResource";

export default function NewContent({ news }: { news: INews }) {
  return (
    <BaseBox className="flex-1 md:p-8 p-4 justify-between flex flex-col md:mb-8 mb-0 gap-4 dark:bg-ausoft-slate-900 ">
      <div className="flex flex-col gap-4">
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
          <DateCategory
            category_name={news?.category ? news.category.name : "no"}
            date={news.created_at}
          />
          <LikeResourceButton resource={news} />
          <ShareButtonResource resource={news} type="news" />
        </div>
        <h1 className="text-lg leading-[2rem] font-bold dark:text-white">
          {news.title}
        </h1>
        <div
          className="dark:text-slate-300 text-lg"
          dangerouslySetInnerHTML={{ __html: news.content }}
        ></div>
      </div>
      <div className="pt-4 flex items-center gap-2 text-lg">
        <h4 className="dark:text-white">
          <CTranslateTo eng="Source: " pt="Fonte: " />
        </h4>
        <h4 className="text-yellow-500">{news.source}</h4>
      </div>
    </BaseBox>
  );
}
