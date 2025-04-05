"use client";

import { BaseBox } from "@/@components/(box)/BaseBox";
import { langByCookies } from "@/http/axios/api";
import { IEvent } from "@/http/interfaces/models/IEvent";
import { ReactIcons } from "@/utils/icons";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { useState } from "react";

export default function EventCard({
  event,
  index,
}: {
  index: number;
  event: Omit<IEvent, "">;
}) {
  const [showImageFooter, setShowImageFooter] = useState(false);

  return (
    <motion.div
      initial={{ y: "9rem", opacity: 0 }}
      animate={{ y: "0rem", opacity: 1 }}
      transition={{ type: "spring", delay: 0.3 * index, duration: 2 }}
      className="cursor-pointer w-full"
    >
      <div className="flex flex-col gap-4  md:hover:scale-[1.03] scale-100 transition-all">
        <BaseBox
          onMouseEnter={() => setShowImageFooter(true)}
          onMouseLeave={() => setShowImageFooter(false)}
          style={{
            height: "400px",
            width: window.innerWidth < 765 ? "100%" : "100%",
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${event.image_url})`,
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
                <ReactIcons.AiICon.AiOutlineUserSwitch
                  size={20}
                  className="text-white"
                />
                <h1 className="text-white">{`${event.organizer?.first_name} ${event.organizer?.last_name}`}</h1>
              </div>
            </motion.div>
          )}
        </BaseBox>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-xl dark:text-white">{event.title}</h4>
          <h4 className="flex items-center gap-2 dark:text-slate-300">
            <ReactIcons.Hi2Icon.HiCalendar size={15} />
            {format(
              event.start_at,
              langByCookies === "pt"
                ? "d 'de' MMMM 'às' HH:mm"
                : "d MMMM 'at' HH:mm",
              { locale: langByCookies === "pt" ? ptBR : enUS }
            )}
          </h4>
          <h4 className="flex items-center gap-2 dark:text-slate-300 text-slate-700">
            <ReactIcons.Hi2Icon.HiMap size={15} />
            {event.reference_address}
          </h4>
        </div>
      </div>
    </motion.div>
  );
}
