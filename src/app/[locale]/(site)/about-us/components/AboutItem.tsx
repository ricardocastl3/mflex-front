import AAnimated from "@/@components/(ausoft)/AAnimated";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

import { IconType } from "react-icons";

export default function AboutItem({
  title_en,
  title_pt,
  des_en,
  des_pt,
  Icon,
}: {
  title_pt: string;
  title_en: string;
  des_en: string;
  des_pt: string;
  Icon: IconType;
}) {
  return (
    <AAnimated animate="animate-fade">
      <div className="flex flex-col gap-3">
        <h3 className="flex items-center gap-2 font-bold md:text-2xl text-xl dark:text-yellow-400 text-yellow-800">
          <CTranslateTo eng={title_en} pt={title_pt} />
          <Icon size={25} />
        </h3>
        <h3 className="text-slate-600 dark:text-slate-400 md:text-lg text-base">
          <CTranslateTo eng={des_en} pt={des_pt} />
        </h3>
      </div>
    </AAnimated>
  );
}
