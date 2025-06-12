import { IMusic } from "@/http/interfaces/models/artists/IMusic";

import MusicCardPublic from "../../components/container/MusicCardPublic";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function MusicOthers({
  musics,
  newElement,
}: {
  newElement: IMusic;
  musics: IMusic[];
}) {
  if (
    musics.filter(
      (i) => i.category?.id != newElement.category?.id && i.id != newElement.id
    ).length <= 0
  ) {
    return <></>;
  }

  return (
    <div className="md:py-10 py-10 md:px-[3rem] px-6 flex mt-5 flex-col gap-8 bg-slate-300/40 dark:bg-ausoft-slate-950 pt-2 border-t border-slate-300 dark:border-slate-800">
      <h1 className="dark:text-white text-xl font-bold md:pt-0 pt-8">
        <CTranslateTo eng="Others Musics" pt="Outras Músicas" />
      </h1>
      <div className="grid md:grid-cols-4 grid-cols-1 md:items-start items-start w-full md:gap-4 gap-6">
        {musics
          .filter(
            (i) =>
              i.category?.id != newElement.category?.id && i.id != newElement.id
          )
          .map((newEl, i) => {
            return (
              i <= 2 && <MusicCardPublic music={newEl} index={i} key={i} />
            );
          })}
      </div>
    </div>
  );
}
