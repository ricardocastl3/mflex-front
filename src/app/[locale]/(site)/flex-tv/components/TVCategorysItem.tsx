import { BaseBox } from "@/@components/(box)/BaseBox";
import { motion } from "framer-motion";
import { useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { ITVCategorySafed } from "@/http/interfaces/models/ITVChannel";

import TVItem from "./TVITem";

export default function TVCategorysItem({
  category,
}: {
  category: ITVCategorySafed;
}) {
  const [show, setShow] = useState(true);

  return (
    <div className="relative animate-fade-up">
      <BaseBox
        onClick={() => setShow((state) => !state)}
        className={`${
          show ? "rounded-t-xl rounded-b-none" : "rounded-xl"
        } z-10 w-full p-4 flex items-center justify-between cursor-pointer`}
      >
        <div className="flex items-center gap-3">
          <div className="md:text-[1rem] text-[0.85rem]">
            <h1 className="dark:text-white font-bold">{category.name}</h1>
          </div>
        </div>

        <button className="dark:text-white">
          <ReactIcons.PiIcon.PiCaretDoubleDown
            size={15}
            className={`${show ? "rotate-180" : ""} transition-all`}
          />
        </button>
      </BaseBox>
      {show && (
        <motion.div
          initial={{ translateY: "-0.5rem" }}
          animate={{ translateY: "0rem" }}
          className="w-full z-0 rounded-b-xl grid md:grid-cols-4 grid-cols-1 gap-4 top-[3rem] px-4 pt-4 pb-4 text-base dark:bg-ausoft-slate-900 bg-white/50 text-slate-800 dark:text-slate-400"
        >
          {category.tv.map((item, i) => {
            return <TVItem key={i} item={item} />;
          })}
        </motion.div>
      )}
    </div>
  );
}
