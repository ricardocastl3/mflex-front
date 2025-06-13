"use client";

import { BaseBox } from "@/@components/(box)/BaseBox";
import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { IMusic } from "@/http/interfaces/models/artists/IMusic";

import Link from "next/link";
import MusicViews from "@/app/[locale]/app/(artist)/art-musics/components/MusicViews";

export default function MusicCardPublic({
  music,
  index,
}: {
  index: number;
  music: IMusic;
}) {
  const [showImageFooter, setShowImageFooter] = useState(false);

  return (
    <motion.div
      initial={{ y: "9rem", opacity: 0 }}
      animate={{ y: "0rem", opacity: 1 }}
      transition={{ type: "spring", delay: 0.3 * index, duration: 2 }}
      className="cursor-pointer w-full"
    >
      <Link
        href={`/${langByCookies}/musics/${music.slug}`}
        className="flex flex-col gap-4  md:hover:scale-[1.03] scale-100 transition-all bg-white dark:bg-transparent rounded-2xl dark:p-0 p-2"
      >
        <BaseBox
          onMouseEnter={() => setShowImageFooter(true)}
          onMouseLeave={() => setShowImageFooter(false)}
          style={{
            height: window.innerWidth < 765 ? "200px" : "150px",
            width: window.innerWidth < 765 ? "100%" : "100%",
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${music.cover})`,
            backgroundRepeat: "no-repeat",
          }}
          className="flex flex-col gap-2  justify-between"
        >
          <div></div>
          {(showImageFooter || window.innerWidth <= 765) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-black/50 rounded-b-xl"
            >
              <div className="flex items-center gap-2">
                <ReactIcons.AiICon.AiOutlineUser
                  size={18}
                  className="text-white"
                />
                <h1 className="text-sm text-white">
                  {`${music.artist_profile?.name}`}
                </h1>
              </div>
            </motion.div>
          )}
        </BaseBox>
        <div className="flex flex-col gap-2 dark:px-0 px-2 dark:pb-0 pb-4">
          <div className="flex items-center gap-2">
            <h1 className="h-fit w-fit text-xs gap-1 pl-1 pr-1.5 py-0.5 rounded-full bg-yellow-200 dark:bg-yellow-800/40 dark:text-yellow-400 text-yellow-800 flex items-center">
              <ReactIcons.HiIcon.HiPlay size={18} />
              {music.category ? music.category.name : "-------"}
            </h1>
            <MusicViews views={music.views_count.length} />
          </div>
          <h4 className="font-bold md:text-[1rem] text-{1rem} dark:text-white">
            {music.title}
          </h4>
        </div>
      </Link>
    </motion.div>
  );
}
