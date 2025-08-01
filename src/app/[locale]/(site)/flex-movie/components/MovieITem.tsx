import { ITVMovieSafed } from "@/http/interfaces/models/tv/ITVMovie";
import { motion } from "framer-motion";
import { useState } from "react";
import { localImages } from "@/utils/images";
import { langByCookies } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useRouter } from "next/navigation";
import { useAppProvider } from "@/providers/app/AppProvider";

import Image from "next/image";
import MovieStartRating from "./MovieStartRating";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function TVMovieItem({
  item,
  index,
}: {
  item: ITVMovieSafed;
  index: number;
}) {
  const { currentSubscription } = useAuth();
  const { serverStats } = useAppProvider();

  const [imageError, setImageError] = useState(false);

  const router = useRouter();

  function handleSubscribe() {
    LocalStorageServices.resetAllKeys();
    LocalStorageServices.setWatchMovieID(item.id);

    router.push(`/${langByCookies}/pricing`);
  }

  const hasSubscription =
    !item.public &&
    (!currentSubscription ||
      (currentSubscription && !currentSubscription?.flex_movie))
      ? false
      : true;

  return (
    <>
      <motion.div
        onClick={() => {
          if (serverStats?.tv_movie_on) {
            if (item.public) {
              router.push(`/${langByCookies}/flex-movie/${item.id}`);
            } else {
              if (currentSubscription && currentSubscription?.flex_movie) {
                router.push(`/${langByCookies}/flex-movie/${item.id}`);
              } else {
                handleSubscribe();
              }
            }
          }
        }}
        initial={{ y: "9rem", opacity: 0 }}
        animate={{ y: "0rem", opacity: 1 }}
        transition={{ type: "spring", delay: 0.3 * index, duration: 2 }}
        className="cursor-pointer w-full"
      >
        <div className="flex w-full flex-col md:gap-4 gap-2.5 dark:p-0 p-2 md:hover:scale-[1.03] scale-100 transition-all bg-white dark:bg-transparent rounded-2xl">
          <div className="flex justify-center w-full rounded-xl">
            <div className="relative w-full md:h-[285px] h-[250px] bg-transparent">
              <Image
                src={
                  imageError || !item.logo
                    ? localImages.bgs.moviePlaceholder
                    : item.logo
                }
                alt={item.name}
                fill
                className={`${
                  hasSubscription ? "object-cover" : "object-cover"
                }  rounded-xl`}
                onError={() => setImageError(true)}
                unoptimized
              />

              {!serverStats?.tv_movie_on && (
                <>
                  <div className="z-20 flex-col rounded-xl gap-2 absolute bg-black/60  h-full flex justify-center items-center">
                    <h1 className="text-sm text-white md:px-8 px-4 text-center">
                      <CTranslateTo
                        eng="Comming Soon in MFLEX 🚀"
                        pt="Brevemente disponível na MFLEX 🚀"
                      />
                    </h1>
                  </div>
                </>
              )}

              {serverStats?.tv_movie_on && (
                <>
                  {!hasSubscription && (
                    <div className="z-20 flex-col rounded-xl inset-0 gap-2 absolute bg-black/60  h-full flex justify-center items-center">
                      <h1 className="text-sm text-white md:px-8 px-4 text-center">
                        <CTranslateTo
                          eng="You don't have an subscription"
                          pt="Você não tem uma assinatura ativa"
                        />
                      </h1>
                      <AuSoftUI.UI.Button
                        variant={"primary"}
                        size={"sm"}
                        className="items-center h-fit pt-1.5"
                      >
                        <ReactIcons.MdIcon.MdTv size={14} />
                        <CTranslateTo
                          eng="I want to watch"
                          pt="Quero assistir"
                        />
                      </AuSoftUI.UI.Button>
                    </div>
                  )}{" "}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 dark:px-0 px-2 dark:pb-0 pb-4">
            <MovieStartRating item={item} />
            <h4 className="font-bold md:text-base text-[0.9rem] dark:text-white">
              {item.name.replace("PT|", "").replace("BR|", "")}
            </h4>
          </div>
        </div>
      </motion.div>
    </>
  );
}
