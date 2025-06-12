import { useEffect, useState, useRef } from "react";
import { Howl, Howler } from "howler";
import { ReactIcons } from "@/utils/icons";
import { useMusicProvider } from "@/providers/features/MusicProvider";

import useClickOutside from "@/hooks/useClickOutside";

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

  function setSeekingResumeMusic(seconds: number) {
    if (soundRef.current) {
      soundRef.current.seek(seconds);
    }
  }

  useEffect(() => {
    soundRef.current = new Howl({
      src: [url],
      volume: 0.5,
      html5: true,
      onend: () => {
        handleIsPlayingMusic(false);
        setIsPlaying(false);
      },
      onplay: () => {
        const updateTime = () => {
          if (soundRef.current && isPlaying) {
            const currentTime = soundRef.current.seek();
            if (typeof currentTime === "number") {
              seekPlayerSeconds(Math.floor(currentTime));
            }
            requestAnimationFrame(updateTime);
          }
        };
        updateTime();
      },
      onload: () => {
        if (soundRef.current) {
          const duration = soundRef.current.duration();
          if (typeof duration === "number") {
            seekPlayerSeconds(0);
          }
        }
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
  }, [volume]);

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
          {isPlaying && (
            <ReactIcons.AiICon.AiFillPauseCircle size={size || 25} />
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
