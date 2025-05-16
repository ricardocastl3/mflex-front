import { useRef, useState } from "react";
import ReactPlayerCMP from "react-player";

export default function ReactPlayer() {
  const playerRef = useRef(null);

  const containerRef = useRef(null);

  const [playerState, setPlayerState] = useState<{
    play: boolean;
    fullscreen: boolean;
    volume: number;
  }>({ fullscreen: false, play: true, volume: 50 });

  const toggleFullscreen = () => {
    const el: any = containerRef.current;
    if (!document.fullscreenElement) {
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
    <div ref={containerRef} className="flex w-full h-full">
      <ReactPlayerCMP />
    </div>
  );
}
