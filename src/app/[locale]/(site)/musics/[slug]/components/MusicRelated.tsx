import { BaseBox } from "@/@components/(box)/BaseBox";
import { localImages } from "@/utils/images";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useAppProvider } from "@/providers/app/AppProvider";
import { IMusic } from "@/http/interfaces/models/artists/IMusic";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import MusicCardPublic from "../../components/container/MusicCardPublic";
import Image from "next/image";
import SubscribeBanner from "../../../components/ads/SubscribeBanner";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function MusicRelated({
  musics,
  newElement,
}: {
  newElement: IMusic;
  musics: IMusic[];
}) {
  const { isNotifyGranted } = useAppProvider();

  return (
    <div className="flex flex-col  md:px-0 px-5 gap-4 md:pb-12 pb-2">
      <BaseBox className="p-4 dark:bg-ausoft-slate-900 dark:text-white font-bold text-lg">
        <CTranslateTo eng="Related Music" pt="Músicas Relacionadas" />
      </BaseBox>
      <div className="flex flex-col md:gap-4 gap-6 md:w-[20rem] w-full">
        {musics.filter(
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
              eng="No related music"
              pt="Sem músicas relacionadas"
            />
          </BaseBox>
        )}
        <SubscribeBanner
          desc_en="Subscribe now and be the first to catch the latest music before anyone else!"
          desc_pt="Inscreva-se agora e fique por dentro antes de todo mundo!"
          title_en="Welcome to come  😀"
          title_pt="Parabéns por ter chegado 😀"
        />

        {!LocalStorageServices.hasSubscriber() && (
          <>
            {musics
              .filter(
                (i) =>
                  i.category?.id == newElement.category?.id &&
                  i.id != newElement.id
              )
              .map((newEl, i) => {
                return (
                  i < 1 && <MusicCardPublic index={i} key={i} music={newEl} />
                );
              })}
          </>
        )}

        {LocalStorageServices.hasSubscriber() && !isNotifyGranted && (
          <>
            {musics
              .filter(
                (i) =>
                  i.category?.id == newElement.category?.id &&
                  i.id != newElement.id
              )
              .map((newEl, i) => {
                return (
                  i < 1 && <MusicCardPublic index={i} key={i} music={newEl} />
                );
              })}
          </>
        )}

        {LocalStorageServices.hasSubscriber() && isNotifyGranted && (
          <>
            {musics
              .filter(
                (i) =>
                  i.category?.id == newElement.category?.id &&
                  i.id != newElement.id
              )
              .map((newEl, i) => {
                return (
                  i < 2 && <MusicCardPublic index={i} key={i} music={newEl} />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}
