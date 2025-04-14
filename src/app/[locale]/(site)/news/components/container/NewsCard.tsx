"use client";

import { BaseBox } from "@/@components/(box)/BaseBox";
import { langByCookies } from "@/http/axios/api";
import { INews } from "@/http/interfaces/models/INews";
import { ReactIcons } from "@/utils/icons";
import { motion } from "framer-motion";
import { useState } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";
import DateCategory from "../../../components/DateCategory";

export default function NewsCard({
  news,
  index,
}: {
  index: number;
  news: Omit<INews, "content">;
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
        href={`/${langByCookies}/news/${news.slug}`}
        className="flex flex-col gap-4  md:hover:scale-[1.03] scale-100 transition-all"
      >
        <BaseBox
          onMouseEnter={() => setShowImageFooter(true)}
          onMouseLeave={() => setShowImageFooter(false)}
          style={{
            height: "200px",
            width: window.innerWidth < 765 ? "100%" : "100%",
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${news.image_url})`,
            backgroundRepeat: "no-repeat",
          }}
          className="flex  flex-col gap-2  justify-between"
        >
          <div></div>
          {(showImageFooter || window.innerWidth <= 765) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-black/50 rounded-b-xl"
            >
              <div className="flex items-center gap-4">
                <ReactIcons.AiICon.AiOutlineGlobal
                  size={20}
                  className="text-white"
                />
                <h1 className="text-white">
                  <CTranslateTo eng="Source: " pt="Fonte: " />{" "}
                  {`${news.source}`}
                </h1>
              </div>
            </motion.div>
          )}
        </BaseBox>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-xl dark:text-white">{news.title}</h4>

          <DateCategory
            category_name={news?.category ? news.category.name : "no"}
            date={news.created_at}
          />
        </div>
      </Link>
    </motion.div>
  );
}
