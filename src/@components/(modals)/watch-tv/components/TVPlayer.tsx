import { AuSoftUI } from "@/@components/(ausoft)";
import { IWatchTV } from "@/http/interfaces/models/IWatchTV";
import { ReactIcons } from "@/utils/icons";
import { useRef, useState } from "react";

import ReactPlayer from "react-player";

export default function TVPlayer({ item }: { item: IWatchTV }) {
  const [playerState, setPlayerState] = useState<{
    play: boolean;
    fullscreen: boolean;
    volume: number;
  }>({ fullscreen: false, play: true, volume: 50 });

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!document.fullscreenElement) {
      //@ts-ignore
      el.requestFullscreen().catch((err: any) => {
        console.error(`Erro ao entrar em fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  function handlePause() {
    setPlayerState((state) => ({
      ...state,
      play: false,
    }));
  }

  return (
    <div className="flex flex-col w-full justify-between">
      <div
        ref={containerRef}
        style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}
        className="flex items-center justify-center"
      >
        <ReactPlayer
          ref={playerRef}
          volume={playerState.volume / 100}
          playing={playerState.play}
          onPause={handlePause}
          url={item.url}
          height={"100%"}
          width={"100%"}
          onReady={() => setIsLoading(false)}
        />

        {isLoading && (
          <div className="flex items-center justify-center p-12">
            <ReactIcons.CgIcon.CgSpinner
              size={30}
              className="animate-spin dark:text-white"
            />
          </div>
        )}
      </div>
      <div className="md:p-4 p-4 flex items-center gap-4">
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
      </div>
    </div>
  );
}
