import { useEffect, useState, useRef } from "react";
import { Howl, Howler } from "howler";
import { ReactIcons } from "@/utils/icons";

export default function ASoundPlayer({ url }: { url: string }) {
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize Howl only once
    soundRef.current = new Howl({
      src: [url],
      volume: 0.5,
      html5: true,
      onend: () => {
        setIsPlaying(false);
      },
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!soundRef.current) return;
    Howler.volume(1); //volume / 100);
  }, [volume]);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsPlaying((state) => !state)}
          className="p-2 rounded-full text-white bg-orange-500"
        >
          {!isPlaying && <ReactIcons.AiICon.AiFillPlayCircle size={25} />}
          {isPlaying && <ReactIcons.AiICon.AiFillPauseCircle size={25} />}
        </button>
        <div className="hidden">
          <input
            type="range"
            className=""
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
