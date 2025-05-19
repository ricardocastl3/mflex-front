import { ITVChannelSafed } from "@/http/interfaces/models/tv/ITVChannel";

import VideoPlayer from "./players/VideoPlayer";

export default function TVPlayer({ item }: { item: ITVChannelSafed }) {
  return (
    <div className="flex w-full h-full">
      <VideoPlayer item_id={item.id} />
    </div>
  );
}
