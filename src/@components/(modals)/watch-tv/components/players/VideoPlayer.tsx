import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";
import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { internalApi } from "@/http/axios/api";

import React, { useRef, useEffect, useState } from "react";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import videojs from "video.js";

import "video.js/dist/video-js.css";

import "@videojs/themes/dist/city/index.css";
import "@videojs/themes/dist/fantasy/index.css";
import "@videojs/themes/dist/forest/index.css";
import "@videojs/themes/dist/sea/index.css";
import "videojs-hls-quality-selector";

import CookieServices from "@/services/auth/CookieServices";

interface Props {
  item_id: string;
}

const VideoPlayer: React.FC<Props> = ({ item_id }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const tentativasRef = useRef(0);

  const [isRefreshing, setIsRefreshing] = useState(true);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const [checkUser, setCheckUser] = useState(false);
  const [initialSRC, setInitialSrc] = useState("");

  const { userLogged } = useAuth();
  const { handleOpenModal } = useModal();
  const { selectedFlexTV } = useFlexTVProvider();

  const watchUrl = selectedFlexTV ? "streams" : "movies";

  useEffect(() => {
    internalApi.get(`/${watchUrl}/watch/${item_id}`).then((e) => {
      setInitialSrc(e.data.url);
      if (e.data.url != "") {
        const url = e.data.url.split("k=")[1];
        CookieServices.setWatchToken(url);
      }
    });
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (checkUser) {
      timeout = setTimeout(() => {
        if (!userLogged) {
          handleOpenModal("watch-no-ads");
        }
      }, 20000);

      if (!selectedFlexTV) return;
      const findView = selectedFlexTV?.views.find(
        (i) => i.user.id == userLogged?.id
      );
      if (!findView) {
        internalApi.post("/users/vs", {
          id: selectedFlexTV.id,
        });
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [checkUser, userLogged, selectedFlexTV]);

  useEffect(() => {
    if (initialSRC == "") return;
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
            src: initialSRC,
            type: "application/x-mpegURL",
          },
        ],
      });

      const player = playerRef.current;

      // Ative o plugin de seleção de qualidade
      playerRef.current.hlsQualitySelector({
        displayCurrentQuality: true,
      });

      player.on("playing", () => {
        setCheckUser(true);
        setIsRefreshing(false);
        setIsReconnecting(false);
        tentativasRef.current = 0;
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [initialSRC]);

  return (
    <div className="relative w-full h-full">
      {isRefreshing && (
        <div className="absolute inset-0 flex flex-col gap-2 justify-center items-center z-20 bg-black">
          <div className="flex flex-col gap-4 md:w-[50vw] w-[90vw] items-center justify-center text-center">
            <ReactIcons.CgIcon.CgSpinner
              size={35}
              className="text-white animate-spin"
            />

            {!isReconnecting && (
              <h1 className="text-white text-base">
                <CTranslateTo
                  eng="Just a moment 😀, it won't take long..."
                  pt="Só um instantezinho 😀, não vai demorar..."
                />
              </h1>
            )}
            {isReconnecting && (
              <h1 className="text-white text-base">
                <CTranslateTo eng="Reconnecting..." pt="Reconectando..." />
              </h1>
            )}
          </div>
        </div>
      )}
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered vjs-theme-forest w-full h-full"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
