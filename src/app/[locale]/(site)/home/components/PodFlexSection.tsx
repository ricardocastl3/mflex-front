import { langByCookies } from "@/http/axios/api";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";
import usePodcasts from "@/hooks/api/usePodCasts";
import PodFlexCard from "../../podflex/components/container/PodFlexCard";
import AAnimated from "@/@components/(ausoft)/AAnimated";

export default function PodFlexSection() {
  const { allPodcasts, isLoadingAllPodcasts } = usePodcasts({
    route: "slug",
  });

  return (
    <AAnimated animate="animate-fade-up">
      <section className="flex flex-col gap-4 md:py-8 py-5 md:px-12 px-5">
        <div className="flex flex-col gap-3 items-center text-center pb-3 border-b border-slate-400/50 dark:border-slate-700/50">
          <div className="p-2 rounded-full bg-yellow-500 text-white">
            <ReactIcons.AiICon.AiFillStar size={14} />
          </div>
          <h4 className="md:text-2xl text-lg font-bold dark:text-white ">
            <CTranslateTo eng="Explore Podcasts" pt="Explore Podcasts" />
          </h4>
          <h3 className="text-lg text-slate-700 dark:text-slate-400">
            <CTranslateTo
              eng="Discover the latest trends and insights from our country's leading voices."
              pt="Descubra as últimas tendências e insights das vozes mais influentes do nosso país."
            />
          </h3>
        </div>

        <div className="mt-6">
          <div className="grid md:grid-cols-3 grid-cols-1 items-start gap-6">
            {isLoadingAllPodcasts &&
              Array.from({ length: 3 }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="rounded-xl bg-white dark:bg-slate-700 animate-pulse p-16"
                  ></div>
                );
              })}

            {!isLoadingAllPodcasts &&
              allPodcasts.map((news, i) => {
                return (
                  i < 3 && <PodFlexCard key={i} podcast={news} index={i} />
                );
              })}
          </div>

          <div className="flex justify-center items-center text-center py-14">
            <Link href={`/${langByCookies}/podflex`} className="animate-bounce">
              <AuSoftUI.UI.Button
                size={"sm"}
                className="rounded-full font-bold items-center"
                variant={"primary"}
              >
                <CTranslateTo eng="View all podcasts" pt="Ver todos podcasts" />
                <ReactIcons.AiICon.AiOutlineLink size={12} />
              </AuSoftUI.UI.Button>
            </Link>
          </div>
        </div>
      </section>
    </AAnimated>
  );
}
