import { BaseBox } from "@/@components/(box)/BaseBox";
import { ITVMovie } from "@/http/interfaces/models/tv/ITVMovie";

import LikeResourceButton from "../../../components/likes/LikeResourceButton";
import MoviePlayer from "@/@components/(modals)/watch-tv/components/players/MoviePlayer";
import ShareButtonResource from "../../../components/shares/ShareButtonResource";
import ShareViewsResource from "../../../components/views/ShareViewsResource";

export default function MVBoardContent({ movie }: { movie: ITVMovie }) {
  return (
    <BaseBox className="flex-1 md:p-8 p-0 md:mb-8 mb-0 md:rounded-xl rounded-none flex flex-col md:gap-4 gap-0 dark:bg-ausoft-slate-900 ">
      <div className="w-full rounded-xl md:h-[63vh] h-[30vh]">
        <MoviePlayer item_id={movie.id} />
      </div>
      <div className="flex flex-col gap-4 md:p-0 p-4">
        <div className="md:hidden flex flex-col gap-3 border-b pb-3 border-slate-300 dark:border-slate-800/60">
          <h4 className="text-[1.7rems] dark:text-white font-bold">
            {movie.name}
          </h4>
        </div>

        <div className="flex items-center gap-3 flex-wrap ">
          <LikeResourceButton resource={movie} />
          <ShareButtonResource resource={movie} type="movie" />
          <ShareViewsResource views={movie.views.length} />
        </div>
      </div>
    </BaseBox>
  );
}
