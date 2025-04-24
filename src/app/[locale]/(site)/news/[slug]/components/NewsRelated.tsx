import { INews } from "@/http/interfaces/models/INews";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { localImages } from "@/utils/images";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import NewsCard from "../../components/container/NewsCard";
import Image from "next/image";
import SubscribeBanner from "../../../components/ads/SubscribeBanner";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useAppProvider } from "@/providers/app/AppProvider";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function NewsRelated({
  news,
  newElement,
}: {
  newElement: INews;
  news: INews[];
}) {
  const { userLogged } = useAuth();
  const { isNotifyGranted } = useAppProvider();

  return (
    <div className="flex flex-col gap-4 md:pb-12 pb-2">
      <BaseBox className="p-4 dark:bg-ausoft-slate-900 dark:text-white font-bold text-lg">
        <CTranslateTo eng="Related News" pt="Novidades Relacionadas" />
      </BaseBox>
      <div className="flex flex-col md:gap-4 gap-6 md:w-[20rem] w-full">
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
        <SubscribeBanner
          desc_en="Subscribe now and be the first to catch the latest news before anyone else!"
          desc_pt="Inscreva-se agora e fique por dentro das últimas notícias antes de todo mundo!"
          title_en="Welcome to come  😀"
          title_pt="Parabéns por ter chegado 😀"
        />

        {(LocalStorageServices.hasSubscriber() && !isNotifyGranted) ||
          !LocalStorageServices.hasSubscriber() && (
            <>
              {news
                .filter(
                  (i) =>
                    i.category?.id == newElement.category?.id &&
                    i.id != newElement.id
                )
                .map((newEl, i) => {
                  return i < 1 && <NewsCard index={i} key={i} news={newEl} />;
                })}
            </>
          )}

        {LocalStorageServices.hasSubscriber() && isNotifyGranted && (
          <>
            {news
              .filter(
                (i) =>
                  i.category?.id == newElement.category?.id &&
                  i.id != newElement.id
              )
              .map((newEl, i) => {
                return i < 2 && <NewsCard index={i} key={i} news={newEl} />;
              })}
          </>
        )}
      </div>
    </div>
  );
}
