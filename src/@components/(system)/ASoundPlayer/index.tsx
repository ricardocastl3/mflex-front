import { useEffect, useState, useRef } from "react";
import { Howl, Howler } from "howler";
import { ReactIcons } from "@/utils/icons";
import { useMusicProvider } from "@/providers/features/MusicProvider";

import useClickOutside from "@/hooks/useClickOutside";
import { AuSoftUI } from "@/@components/(ausoft)";

export default function ASoundPlayer({
  url,
  style,
  color,
  size,
  padding,
  isListMusic = false,
}: {
  url: string;
  style?: string;
  size?: string;
  color?: string;
  padding?: string;
  isPlaying?: boolean;
  isListMusic?: boolean;
}) {
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const soundRef = useRef<Howl | null>(null);
  const soundPlayerRef = useRef<null>(null);

  // Contexts
  useClickOutside(soundPlayerRef, () => {
    if (isListMusic) {
      setIsPlaying(false);
    }
  });

  const {
    handleIsPlayingMusic,
    isPlayingMusic,
    playerSeekSecondsByClick,
    seekPlayerSeconds,
  } = useMusicProvider();

  const [hoverInButtonPlay, setHoverInButtonPlay] = useState(false);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [url],
      volume: 1,
      html5: true,
      onend: () => {
        handleIsPlayingMusic(false);
        setIsPlaying(false);
      },
      onload: () => {
        setIsLoading(false);
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

    if (isPlaying && isPlayingMusic) {
      soundRef.current.play();
    } else {
      // For list of music in artist panel
      if (isListMusic) {
        soundRef.current.stop();
      } else {
        // For general
        soundRef.current.pause();
      }
      if (hoverInButtonPlay && isPlayingMusic) soundRef.current.play();
    }
  }, [isPlaying, isPlayingMusic]);

  useEffect(() => {
    if (!soundRef.current) return;
    Howler.volume(1); //volume / 100);

    return () => {
      handleIsPlayingMusic(false);
    };
  }, [volume]);

  useEffect(() => {
    seekPlayerSeconds(0);
  }, []);
  
  useEffect(() => {
    if (soundRef.current && isPlaying) {
      const interval = setInterval(() => {
        const currentTime = soundRef.current?.seek();
        if (typeof currentTime === "number") {
          seekPlayerSeconds(Math.floor(currentTime));
        }
      }, 1000); // Update every 100ms for smoother progress

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Handle seek from click
  useEffect(() => {
    if (playerSeekSecondsByClick > 0 && soundRef.current) {
      soundRef.current.seek(playerSeekSecondsByClick);
      seekPlayerSeconds(playerSeekSecondsByClick);
    }
  }, [playerSeekSecondsByClick]);

  return (
    <div ref={soundPlayerRef} className={`flex items-center gap-3 ${style}`}>
      <div
        onMouseEnter={() => setHoverInButtonPlay(true)}
        onMouseLeave={() => setHoverInButtonPlay(false)}
        className="flex items-center gap-3"
      >
        <button
          onClick={() => {
            handleIsPlayingMusic(!isPlaying), setIsPlaying((state) => !state);
          }}
          className={`${padding || "p-2"} rounded-full ${
            color || "text-white bg-orange-500"
          }`}
        >
          {!isPlaying && (
            <ReactIcons.AiICon.AiFillPlayCircle size={size || 25} />
          )}
          {isPlaying && !isLoading && (
            <ReactIcons.AiICon.AiFillPauseCircle size={size || 25} />
          )}

          {isLoading && isPlaying && (
            <ReactIcons.PiIcon.PiSpinner
              className="animate-spin"
              size={size || 25}
            />
          )}
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
