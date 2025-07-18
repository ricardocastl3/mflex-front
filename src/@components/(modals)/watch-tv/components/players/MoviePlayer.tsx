import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { internalApi } from "@/http/axios/api";
import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";

import React, { useRef, useEffect, useState } from "react";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import videojs from "video.js";
import CookieServices from "@/services/auth/CookieServices";

import "video.js/dist/video-js.css";

import "@videojs/themes/dist/city/index.css";
import "@videojs/themes/dist/fantasy/index.css";
import "@videojs/themes/dist/forest/index.css";
import "@videojs/themes/dist/sea/index.css";
import "videojs-hls-quality-selector";

interface Props {
  item_id: string;
}

const MoviePlayer: React.FC<Props> = ({ item_id }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const tentativasRef = useRef(0);

  const [isRefreshing, setIsRefreshing] = useState(true);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const [checkUser, setCheckUser] = useState(false);
  const [initialSRC, setInitialSrc] = useState("");

  const { userLogged } = useAuth();
  const { handleOpenModal } = useModal();
  const { selectedFlexTVMovie } = useFlexTVProvider();

  const watchUrl = "movies";

  useEffect(() => {
    internalApi.get(`/${watchUrl}/watch/${item_id}`).then((e) => {
      if (e.data.url != "") {
        setInitialSrc(e.data.url);
        const url = e.data.url.split("k=")[1];
        CookieServices.setWatchToken(url);
      }
    });
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!playerRef.current) return;

    if (checkUser) {
      timeout = setTimeout(() => {
        if (!userLogged) {
          handleOpenModal("watch-no-ads");
          playerRef.current.dispose();
          playerRef.current = null;
        }
      }, 20000);

      if (!selectedFlexTVMovie) return;
      const findView = selectedFlexTVMovie?.views.find(
        (i) => i.user.id == userLogged?.id
      );
      if (!findView) {
        try {
          internalApi.post("/users/vs", {
            id: selectedFlexTVMovie.id,
          });
        } catch (err) {}
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [checkUser, userLogged, handleOpenModal]);

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

      // Ative o plugin de seleção de qualidade
      playerRef.current.hlsQualitySelector({
        displayCurrentQuality: true,
      });

      const player = playerRef.current;

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

export default MoviePlayer;
