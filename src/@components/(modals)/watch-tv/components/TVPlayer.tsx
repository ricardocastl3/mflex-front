import { ITVChannelSafed } from "@/http/interfaces/models/ITVChannel";

import VideoPlayer from "./players/VideoPlayer";

export default function TVPlayer({ item }: { item: ITVChannelSafed }) {
  return (
    <div className="flex w-full h-full">
      <VideoPlayer src={`/api/streams/watch/${item.id}`} />

      {/* 
      <div className="flex border-t border-slate-200 dark:border-slate-800  md:p-4 p-4 items-center gap-4 justify-self-end">
        <AuSoftUI.UI.Button
          onClick={() => {
            setPlayerState((state) => ({
              ...state,
              play: !state.play,
            }));
          }}
          variant={"outline"}
        >
          {playerState.play && <ReactIcons.MdIcon.MdPause size={18} />}
          {!playerState.play && <ReactIcons.MdIcon.MdPlayCircle size={18} />}
        </AuSoftUI.UI.Button>

        <AuSoftUI.UI.Button onClick={toggleFullscreen} variant={"outline"}>
          <ReactIcons.MdIcon.MdTv size={18} />
        </AuSoftUI.UI.Button>
        <input
          type="range"
          min={0}
          max={100}
          onChange={(e) =>
            setPlayerState((state) => ({
              ...state,
              volume: Number(e.target.value),
            }))
          }
        />
      </div> */}
    </div>
  );
}
