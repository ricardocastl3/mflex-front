import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useModal } from "@/providers/app/ModalProvider";

interface Props {
  src: string;
}

const VideoPlayer: React.FC<Props> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  const [isRefreshing, setIsRefreshing] = useState(true);
  const [checkUser, setCheckUser] = useState(false);

  // Context
  const { userLogged } = useAuth();
  const { handleOpenModal } = useModal();

  useEffect(() => {
    if (checkUser) {
      setTimeout(() => {
        if (!userLogged) {
          handleOpenModal("watch-no-ads");
        }
      }, 60000);
    }
  }, [checkUser]);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        html5: {
          hls: {
            lowLatencyMode: false,
          },
        },
        autoplay: true,
        controls: true,
        responsive: true,
        sources: [
          {
            src,
            type: "application/x-mpegURL",
          },
        ],
      });

      playerRef.current.on("error", () => {
        setIsRefreshing(true);
      });

      playerRef.current.on("playing", () => {
        setCheckUser(true);
        setIsRefreshing(false);
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {isRefreshing && (
        <div
          className="
        absolute inset-0 flex justify-center items-center z-20 bg-black"
        >
          <ReactIcons.CgIcon.CgSpinner
            size={25}
            className="text-white animate-spin"
          />
        </div>
      )}
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered w-full h-full"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
