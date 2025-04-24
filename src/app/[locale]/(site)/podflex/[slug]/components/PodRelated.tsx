import { BaseBox } from "@/@components/(box)/BaseBox";
import { IPodcast } from "@/http/interfaces/models/IPodCast";
import { localImages } from "@/utils/images";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useAppProvider } from "@/providers/app/AppProvider";

import PodFlexCard from "../../components/container/PodFlexCard";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Image from "next/image";
import SubscribeBanner from "../../../components/ads/SubscribeBanner";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function PodRelated({
  podcasts,
  podElement,
}: {
  podElement: IPodcast;
  podcasts: IPodcast[];
}) {
  const { userLogged } = useAuth();
  const { isNotifyGranted } = useAppProvider();

  return (
    <div className="flex flex-col gap-4 md:px-0 px-5 md:pb-12 pb-2">
      <BaseBox className="p-4 dark:bg-ausoft-slate-900 dark:text-white font-bold text-lg">
        <CTranslateTo eng="Related PodCasts" pt="PodCasts Relacionados" />
      </BaseBox>

      <div className="flex flex-col md:gap-4 gap-6 md:w-[20rem] w-full">
        {podcasts.filter(
          (i) =>
            i.category_id == podElement.category_id && i.id != podElement.id
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
          desc_en="Subscribe now and be the first to enjoy the best podcasts!"
          desc_pt="Inscreva-se agora e seja o primeiro a ouvir os melhores podcasts!"
          title_en="Welcome to Your Podcast Hub! 🎧"
          title_pt="Bem-vindo ao nosso mundo de podcasts! 🎧"
        />

        {!LocalStorageServices.hasSubscriber() ||
          (userLogged && !isNotifyGranted) ||
          (!userLogged &&
            LocalStorageServices.hasSubscriber() &&
            !isNotifyGranted && (
              <>
                {podcasts
                  .filter(
                    (i) =>
                      i.category_id == podElement.category_id &&
                      i.id != podElement.id
                  )
                  .map((newEl, i) => {
                    return (
                      i < 1 && <PodFlexCard index={i} key={i} podcast={newEl} />
                    );
                  })}
              </>
            ))}

        {LocalStorageServices.hasSubscriber() && isNotifyGranted && (
          <>
            {podcasts
              .filter(
                (i) =>
                  i.category_id == podElement.category_id &&
                  i.id != podElement.id
              )
              .map((newEl, i) => {
                return (
                  i < 2 && <PodFlexCard index={i} key={i} podcast={newEl} />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}
