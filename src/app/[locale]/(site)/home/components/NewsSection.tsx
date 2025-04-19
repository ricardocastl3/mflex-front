import { langByCookies } from "@/http/axios/api";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useNews from "@/hooks/api/useNews";
import NewsCard from "../../news/components/container/NewsCard";
import Link from "next/link";
import AAnimated from "@/@components/(ausoft)/AAnimated";

export default function NewsSection() {
  const { allNews, isLoadingAllNews } = useNews({ route: "news" });

  return (
    <AAnimated animate="animate-fade-up md:mt-0 mt-8">
      <section className="flex flex-col gap-4 md:py-8 py-5 md:px-12 px-5">
        <div className="flex flex-col gap-3 items-center text-center pb-4 border-b border-slate-400/50 dark:border-slate-700/70">
          <div className="p-2 rounded-full bg-yellow-500 text-white">
            <ReactIcons.AiICon.AiFillStar size={14} />
          </div>
          <h4 className="md:text-2xl text-lg font-bold dark:text-white ">
            <CTranslateTo eng="The Latest Buzz" pt="As Últimas Novidades" />
          </h4>
          <h3 className="text-lg text-slate-700 dark:text-slate-400">
            <CTranslateTo
              eng="Stay updated with the most significant stories shaping our nation."
              pt="Fique por dentro das histórias mais importantes que estão moldando nosso país."
            />
          </h3>
        </div>

        <div className="mt-6">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {isLoadingAllNews &&
              Array.from({ length: 3 }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="rounded-xl bg-white dark:bg-slate-700 animate-pulse p-24"
                  ></div>
                );
              })}

            {!isLoadingAllNews &&
              allNews.map((news, i) => {
                return i < 2 && <NewsCard key={i} news={news} index={i} />;
              })}
          </div>

          <div className="flex justify-center items-center text-center py-14">
            <Link href={`/${langByCookies}/news`} className="animate-bounce">
              <AuSoftUI.UI.Button
                size={"md"}
                className="rounded-full font-bold items-center"
                variant={"primary"}
              >
                <CTranslateTo eng="View all news" pt="Ver todas novidades" />
                <ReactIcons.AiICon.AiOutlineLink size={12} />
              </AuSoftUI.UI.Button>
            </Link>
          </div>
        </div>
      </section>
    </AAnimated>
  );
}
