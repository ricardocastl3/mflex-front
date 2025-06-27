import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

import QuickLinkAcess from "./QuickLinkAcess";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function QuickAccessBox() {
  return (
    <>
      <BaseBox className="w-full p-2">
        <div className="p-2 border-b pb-2 border-r-slate-200 dark:border-slate-800">
          <h1 className="text-sm dark:text-white font-bold flex items-center gap-2">
            <ReactIcons.AiICon.AiOutlineLink size={12} />
            <CTranslateTo eng="Quick access" pt="Acesso rápido" />
          </h1>
        </div>

        <div className="mt-3 mb-2">
          <QuickLinkAcess
            Icon={ReactIcons.MdIcon.MdMusicNote}
            action="/musics"
            t_en="Musics"
            t_pt="Músicas"
          />
          <QuickLinkAcess
            Icon={ReactIcons.AiICon.AiFillHome}
            action="/podcasts"
            t_en="PodCasts"
            t_pt="PodCasts"
          />
          <QuickLinkAcess
            Icon={ReactIcons.AiICon.AiFillHome}
            action="/news"
            t_en="Flex News"
            t_pt="Novidades Flex"
          />
        </div>
      </BaseBox>
    </>
  );
}
