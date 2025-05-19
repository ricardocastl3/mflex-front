import { BaseBox } from "@/@components/(box)/BaseBox";
import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { ITVMovieSafed } from "@/http/interfaces/models/tv/ITVMovie";
import { langByCookies } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import MovieStartRating from "./MovieStartRating";

export default function TVMovieItem({
  item,
  index,
}: {
  item: ITVMovieSafed;
  index: number;
}) {
  const { handleSelectFlexTV } = useFlexTVProvider();
  const { handleOpenModal } = useModal();
  const { currentSubscription } = useAuth();

  function handleSubscribe() {
    LocalStorageServices.resetAllKeys();
    LocalStorageServices.setKey(
      LocalStorageServices.keys.watchTv,
      `wt_${new Date().getTime()}`
    );

    window.location.href = `/${langByCookies}/pricing`;
  }

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!item.logo) return;

    fetch(item.logo)
      .then((data) => data.blob())
      .then((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      });

    // Cleanup function to revoke the object URL when component unmounts
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [item.logo]);

  return (
    <>
      <motion.div
        initial={{ y: "9rem", opacity: 0 }}
        animate={{ y: "0rem", opacity: 1 }}
        transition={{ type: "spring", delay: 0.3 * index, duration: 2 }}
        className="cursor-pointer w-full "
      >
        <div className="flex w-full flex-col md:gap-4 gap-2.5 dark:p-0 p-2 md:hover:scale-[1.03] scale-100 transition-all bg-white dark:bg-transparent rounded-2xl">
          <div className="flex justify-center w-full rounded-xl">
            <div
              style={{
                width: "100%",
                objectFit: "fill",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundImage: url ? `url(${url})` : `url(${item.logo})`,
                backgroundRepeat: "no-repeat",
              }}
              className="flex flex-col md:h-[300px] h-[250px] gap-2 justify-between p-0"
            ></div>
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
