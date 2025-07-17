import { ITVChannelSafed } from "@/http/interfaces/models/tv/ITVChannel";
import { ITVCategoryMovieSafed } from "@/http/interfaces/models/tv/ITVMovie";
import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";

import VideoPlayer from "./players/VideoPlayer";
import MoviePlayer from "./players/MoviePlayer";

export default function TVPlayer({
  item,
}: {
  item: ITVChannelSafed | ITVCategoryMovieSafed;
}) {
  const { selectedFlexTV, selectedFlexTVMovie } = useFlexTVProvider();
  return (
    <div className="flex w-full h-full">
      {selectedFlexTV && <VideoPlayer item_id={item.id} />}
      {selectedFlexTVMovie && <MoviePlayer item_id={item.id} />}
    </div>
  );
}
