import { ITVMovie } from "@/http/interfaces/models/tv/ITVMovie";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TVMovieItem from "../../components/MovieITem";

export default function MVBoardOthers({
  movies,
  movieElement,
}: {
  movieElement: ITVMovie;
  movies: ITVMovie[];
}) {
  if (
    movies.filter(
      (i) =>
        i.category?.id != movieElement.category?.id && i.id != movieElement.id
    ).length <= 0
  ) {
    return <></>;
  }
  const filterItem = window.innerWidth > 765 ? 2 : 3;
  return (
    <div className="md:py-10 py-10 md:px-[3rem] px-5 flex mt-5 flex-col gap-8 bg-slate-300/40 dark:bg-ausoft-slate-950 pt-2 border-t border-slate-300 dark:border-slate-800">
      <h1 className="dark:text-white text-xl font-bold md:pt-0 pt-8">
        <CTranslateTo eng="Others Movies" pt="Outros Filmes" />
      </h1>
      <div className="grid md:grid-cols-5 grid-cols-2 md:items-start items-start w-full md:gap-4 gap-6">
        {movies
          .filter(
            (i) =>
              i.category?.id != movieElement.category?.id &&
              i.id != movieElement.id
          )
          .map((newEl, i) => {
            return (
              i <= filterItem && (
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
