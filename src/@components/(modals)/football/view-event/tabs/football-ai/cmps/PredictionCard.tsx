import { BaseBox } from "@/@components/(box)/BaseBox";
import { motion } from "framer-motion";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";
import { ReactNode, useEffect, useState } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { IJSONPrediction } from "@/http/interfaces/models/football/IJSONPrediction";

export default function PredictionCard({
  children,
  t_en,
  t_pt,
  prediction,
}: {
  t_pt: string;
  t_en: string;
  children: ReactNode;
  prediction?: IJSONPrediction;
}) {
  const [show, setShow] = useState(false);

  const { closeLeagueBox } = useAppProvider();

  useEffect(() => {
    setShow(false);
  }, [closeLeagueBox]);

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
            <h1 className="dark:text-white font-bold">
              <CTranslateTo eng={t_en} pt={t_pt} />
            </h1>
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
          className="w-full z-0 rounded-b-xl top-[3rem] flex flex-col justify-between h-full px-4 pt-4 pb-4 text-base dark:bg-ausoft-slate-900 bg-white/50 text-slate-800 dark:text-slate-400"
        >
          <section>{children}</section>
          <div className="pt-3 flex items-center border-t border-slate-300 dark:border-slate-800">
            <h3 className="font-bold text-base text-yellow-500">
              <CTranslateTo eng="Tips:" pt="Dica:" />
            </h3>
          </div>
        </motion.div>
      )}
    </div>
  );
}
