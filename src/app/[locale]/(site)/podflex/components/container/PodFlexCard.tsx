"use client";

import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { useState } from "react";
import { IPodcast } from "@/http/interfaces/models/IPodCast";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";
import PodFlexCaster from "./PodFlexCaster";

export default function PodFlexCard({
  podcast,
  index,
}: {
  index: number;
  podcast: Omit<IPodcast, "content">;
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
        href={`/${langByCookies}/podflex/${podcast.slug}`}
        className="flex flex-col md:hover:scale-[1.03] scale-100 transition-all"
      >
        <div
          onMouseEnter={() => setShowImageFooter(true)}
          onMouseLeave={() => setShowImageFooter(false)}
          style={{
            height: "200px",
            width: window.innerWidth < 765 ? "100%" : "100%",
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${podcast.thumbnail})`,
            backgroundRepeat: "no-repeat",
          }}
          className="flex rounded-t-xl flex-col gap-2 justify-between"
        >
          <div></div>
          {(showImageFooter || window.innerWidth <= 765) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-black/50"
            >
              <div className="flex items-center gap-2">
                <ReactIcons.AiICon.AiFillPlaySquare
                  size={20}
                  className="text-white"
                />
                <h1 className="text-white">{`${podcast.duration}`}</h1>
                <h4 className="flex items-center gap-2 text-white">
                  <ReactIcons.Hi2Icon.HiCalendar size={15} />
                  {format(
                    podcast.started_at,
                    langByCookies === "pt"
                      ? "d 'de' MMMM 'às' HH:mm"
                      : "d MMMM 'at' HH:mm",
                    { locale: langByCookies === "pt" ? ptBR : enUS }
                  )}
                </h4>
              </div>
            </motion.div>
          )}
        </div>
        <div className="dark:bg-ausoft-slate-900/50 bg-white rounded-b-xl flex flex-col gap-3 md:p-3 p-2.5">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-lg dark:text-white">
              {podcast.title}
            </h4>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {podcast.category?.name == "PodFlex" && (
              <div className="flex items-center gap-2 text-yellow-500">
                <ReactIcons.AiICon.AiFillCiCircle className="" size={18} />
                <h4 className="text-[0.95rem]">
                  <CTranslateTo
                    eng="Exclusive PodFlex"
                    pt="Exclusivo PodFlex"
                  />
                </h4>
              </div>
            )}
            {podcast.category?.name != "PodFlex" && (
              <div className="flex items-center gap-2 dark:text-violet-400 text-violet-500">
                <ReactIcons.AiICon.AiFillCiCircle className="" size={18} />
                <h4 className="text-[0.95rem]">
                  <CTranslateTo eng="Trends" pt="Destaque" />
                </h4>
              </div>
            )}

            <div className="flex items-center gap-2 dark:text-yellow-400 text-yellow-500">
              <ReactIcons.AiICon.AiFillCiCircle className="" size={18} />
              <h4 className="text-[0.95rem]">
                {podcast?.category ? podcast.category.name : "--------"}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 pt-3 border-t border-slate-300 dark:border-slate-800">
            <PodFlexCaster podcaster={podcast.podcaster} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
