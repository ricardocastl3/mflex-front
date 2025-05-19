import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { ITVMovieSafed } from "@/http/interfaces/models/tv/ITVMovie";
import { motion } from "framer-motion";
import { useState } from "react";
import { localImages } from "@/utils/images";

import Image from "next/image";
import MovieStartRating from "./MovieStartRating";

export default function TVMovieItem({
  item,
  index,
}: {
  item: ITVMovieSafed;
  index: number;
}) {
  const { handleSelectFlexTVMovie } = useFlexTVProvider();
  const { handleOpenModal } = useModal();

  const [imageError, setImageError] = useState(false);

  function handleSubscribe() {
    handleSelectFlexTVMovie(item);
    handleOpenModal("watch-tv");
  }

  return (
    <>
      <motion.div
        onClick={handleSubscribe}
        initial={{ y: "9rem", opacity: 0 }}
        animate={{ y: "0rem", opacity: 1 }}
        transition={{ type: "spring", delay: 0.3 * index, duration: 2 }}
        className="cursor-pointer w-full "
      >
        <div className="flex w-full flex-col md:gap-4 gap-2.5 dark:p-0 p-2 md:hover:scale-[1.03] scale-100 transition-all bg-white dark:bg-transparent rounded-2xl">
          <div className="flex justify-center w-full rounded-xl">
            <div className="relative w-full md:h-[300px] h-[250px]">
              <Image
                src={
                  imageError || !item.logo
                    ? localImages.bgs.moviePlaceholder
                    : item.logo
                }
                alt={item.name}
                fill
                className="object-contain rounded-2xl"
                onError={() => setImageError(true)}
                unoptimized
              />
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
