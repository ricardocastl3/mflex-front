"use client";

import { BaseBox } from "@/@components/(box)/BaseBox";
import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { IEvent } from "@/http/interfaces/models/organizer/IEvent";

import Link from "next/link";
import DateCategory from "../../../components/DateCategory";

export default function EventCard({
  event,
  index,
}: {
  index: number;
  event: IEvent;
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
        href={`/${langByCookies}/events/${event.slug}`}
        className="flex flex-col gap-4 dark:p-0 p-2 md:hover:scale-[1.03] scale-100 transition-all bg-white dark:bg-transparent rounded-2xl"
      >
        <BaseBox
          onMouseEnter={() => setShowImageFooter(true)}
          onMouseLeave={() => setShowImageFooter(false)}
          style={{
            height: "400px",
            width: window.innerWidth < 765 ? "100%" : "100%",
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${
              event.image_url != ""
                ? event.image_url
                : "https://img.freepik.com/free-vector/abstract-vertical-banners-with-orange-rolled-wrapping-paper-isolated_1284-48680.jpg?t=st=1744285073~exp=1744288673~hmac=7d793bd806e2ee3a895b2ccbad682ac4828c55b8aa1c2a57d0e5bf854970eb34&w=900"
            })`,
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
              <div className="flex items-center gap-4">
                <ReactIcons.AiICon.AiOutlineUserSwitch
                  size={20}
                  className="text-white"
                />
                <h1 className="text-white">{`${event.organizer?.first_name} ${event.organizer?.last_name}`}</h1>
              </div>
            </motion.div>
          )}
        </BaseBox>
        <div className="flex flex-col gap-2 dark:px-0 px-2 dark:pb-0 pb-4">
          <h4 className="font-bold text-xl dark:text-white">{event.title}</h4>
          <DateCategory
            right
            category_name={event.category ? event.category.name : "no"}
            date={event.start_at}
            hourVisible
          />
          <h4 className="flex items-center gap-2 dark:text-slate-300 text-slate-700">
            <ReactIcons.Hi2Icon.HiMap size={15} />
            {event.reference_address}
          </h4>
        </div>
      </Link>
    </motion.div>
  );
}
