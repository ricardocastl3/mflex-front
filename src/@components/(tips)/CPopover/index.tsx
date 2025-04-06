import { motion } from "framer-motion";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "../../(translation)/CTranslateTo";

export default function CPopever({
  title_en,
  title_pt,
  left,
  top,
}: {
  title_pt: string;
  title_en: string;
  top: number;
  left: number;
}) {
  return (
    <motion.div
      style={{ top, left }}
      initial={{ translateX: "1rem" }}
      animate={{ translateX: "0rem" }}
      className="fixed z-30 top-1 left-24 flex items-center"
    >
      <ReactIcons.BiIcon.BiCaretLeft
        size={15}
        className="text-yellow-600 absolute -left-2"
      />
      <div className="px-2 py-1 w-fit rounded-full text-nowrap text-no bg-yellow-600 text-white">
        <CTranslateTo pt={title_pt} eng={title_en} />
      </div>
    </motion.div>
  );
}
