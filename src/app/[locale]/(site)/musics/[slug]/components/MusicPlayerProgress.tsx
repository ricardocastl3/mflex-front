import { IMusic } from "@/http/interfaces/models/artists/IMusic";
import { useModal } from "@/providers/app/ModalProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useMusicProvider } from "@/providers/features/MusicProvider";
import { useEffect, useState, useMemo, useRef } from "react";

export default function MusicPlayerProgress({ music }: { music: IMusic }) {
  const { userLogged } = useAuth();
  const { handleOpenModal } = useModal();

  const totalDuration = Number(music.duration.split(":")[0]);
  const [initialDuration, setInitialDuration] = useState<{
    min: number;
    second: number;
  }>({ min: 0, second: 0 });

  const {
    clickSeekPlayerSeconds,
    handleIsPlayingMusic,
    playerSeekSeconds,
    handleSelectMusic,
  } = useMusicProvider();

  // Update time display when playerSeekSeconds changes
  useEffect(() => {
    const min = Math.floor(playerSeekSeconds / 60);
    const second = Math.floor(playerSeekSeconds % 60);
    setInitialDuration({ min, second });
  }, [playerSeekSeconds]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!userLogged) {
      handleIsPlayingMusic(false);
      handleSelectMusic(music);
      handleOpenModal("ads-listen-music");
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const seekTime = Math.floor(percentage * totalDuration * 60);
    clickSeekPlayerSeconds(seekTime);
  };

  const formattedTime = useMemo(() => {
    return `${String(initialDuration.min).padStart(2, "0")}:${String(
      initialDuration.second
    ).padStart(2, "0")}`;
  }, [initialDuration.min, initialDuration.second]);

  const parentProgress = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState<string>("0%");

  useEffect(() => {
    if (parentProgress.current) {
      const progressPercentage =
        (playerSeekSeconds / (totalDuration * 60)) * 100;
      const calculatedWidth = Math.min(progressPercentage, 100);
      setMaxWidth(`${calculatedWidth}%`);
    }
  }, [playerSeekSeconds, totalDuration]);

  return (
    <div className="flex items-center gap-5 w-full h-fit">
      <span className="w-[2rem] text-sm text-white">{formattedTime}</span>

      <div
        ref={parentProgress}
        className="rounded-full h-fit cursor-pointer bg-slate-200 flex-1 w-full"
        onClick={handleProgressClick}
      >
        <span
          className={`py-0.5 bg-orange-500 rounded-full block`}
          style={{
            width: maxWidth,
          }}
        ></span>
      </div>
      <span className="w-[2rem] text-sm text-white">{music.duration}</span>
    </div>
  );
}
