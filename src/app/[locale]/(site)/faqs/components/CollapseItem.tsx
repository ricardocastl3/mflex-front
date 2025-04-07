import { BaseBox } from "@/@components/(box)/BaseBox";
import { useState } from "react";
import { motion } from "framer-motion";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { ReactIcons } from "@/utils/icons";

export default function CollapseItem({
  content_en,
  content_pt,
  title_en,
  title_pt,
}: {
  title_pt: string;
  title_en: string;
  content_pt: string;
  content_en: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <BaseBox
        onClick={() => setShow((state) => !state)}
        className={`${
          show ? "rounded-t-xl rounded-b-none" : "rounded-xl"
        } z-10 w-full p-4 flex items-center justify-between cursor-pointer`}
      >
        <h1 className="text-lg dark:text-white font-bold">
          <CTranslateTo eng={title_en} pt={title_pt} />
        </h1>

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
          className="w-full z-0 rounded-b-xl top-[3rem] px-4 pt-4 pb-4 text-base dark:bg-ausoft-slate-900 bg-slate-300/50 text-slate-800 dark:text-slate-400"
        >
          <CTranslateTo eng={content_en} pt={content_pt} />
        </motion.div>
      )}
    </div>
  );
}
