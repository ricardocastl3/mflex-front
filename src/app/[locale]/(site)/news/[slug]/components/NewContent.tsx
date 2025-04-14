import { BaseBox } from "@/@components/(box)/BaseBox";
import { INews } from "@/http/interfaces/models/INews";

import DateCategory from "../../../components/DateCategory";

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
        <DateCategory
          category_name={news?.category ? news.category.name : "no"}
          date={news.created_at}
        />
      </div>
      <div
        className="dark:text-slate-300 text-lg"
        dangerouslySetInnerHTML={{ __html: news.content }}
      ></div>
    </BaseBox>
  );
}
