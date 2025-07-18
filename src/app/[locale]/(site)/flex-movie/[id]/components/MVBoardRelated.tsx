import { BaseBox } from "@/@components/(box)/BaseBox";
import { localImages } from "@/utils/images";
import { ITVMovie } from "@/http/interfaces/models/tv/ITVMovie";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Image from "next/image";
import TVMovieItem from "../../components/MovieITem";

export default function MVBoardRelated({
  movies,
  movieElement,
  displayMode,
}: {
  movieElement: ITVMovie;
  movies: ITVMovie[];
  displayMode: "mobile" | "desktop" | "both";
}) {
  const filterItem = window.innerWidth > 765 ? 1 : 2;
  return (
    <div
      className={`${
        displayMode == "mobile"
          ? "md:hidden flex"
          : displayMode == "desktop"
          ? "md:flex hidden"
          : "flex"
      }  flex-col gap-4 md:px-0 px-5 md:pb-12 pb-2`}
    >
      <BaseBox className="p-4 dark:bg-ausoft-slate-900 dark:text-white font-bold text-lg">
        <CTranslateTo eng="Related Movies" pt="Filmes Relacionados" />
      </BaseBox>

      <div className="grid md:grid-cols-1 grid-cols-2 md:gap-4 gap-6 md:w-[20rem] w-full">
        {movies.filter(
          (i) =>
            i.category?.id == movieElement.category?.id &&
            i.id != movieElement.id
        ).length <= 0 && (
          <BaseBox className="flex flex-col col-span-2 items-center gap-2 p-8 text-center font-bold dark:text-white">
            <Image
              alt=""
              width={50}
              height={50}
              src={localImages.vectors.emptyBox}
            />
            <CTranslateTo
              eng="No related movies"
              pt="Sem filmes relacionados"
            />
          </BaseBox>
        )}

        {movies
          .filter(
            (i) =>
              i.category?.id == movieElement.category?.id &&
              i.id != movieElement.id
          )
          .map((newEl, i) => {
            return (
              i < filterItem && (
                <TVMovieItem
                  item={{
                    public: newEl.is_public,
                    is_live: newEl.is_live,
                    id: newEl.id,
                    rating: newEl.rating,
                    views: newEl.views,
                    logo: newEl.thumbnail,
                    name: newEl.name,
                    me: true,
                    st: newEl.st,
                  }}
                  index={i}
                  key={i}
                />
              )
            );
          })}
      </div>
    </div>
  );
}
