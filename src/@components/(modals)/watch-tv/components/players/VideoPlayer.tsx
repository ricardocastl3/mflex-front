import React, { useRef, useEffect, useState } from "react";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import videojs from "video.js";

import "video.js/dist/video-js.css";

import "@videojs/themes/dist/city/index.css";
import "@videojs/themes/dist/fantasy/index.css";
import "@videojs/themes/dist/forest/index.css";
import "@videojs/themes/dist/sea/index.css";

import CookieServices from "@/services/auth/CookieServices";

import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";
import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { internalApi, langByCookies } from "@/http/axios/api";

interface Props {
  item_id: string;
}

const VideoPlayer: React.FC<Props> = ({ item_id }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const tentativasRef = useRef(0);
  const MAX_TENTATIVAS = 4;
  const INTERVALO_RECONEXAO = 3000; // 3 segundos

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
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [checkUser, userLogged, handleOpenModal]);

  const reconnect = () => {
    if (tentativasRef.current >= MAX_TENTATIVAS) {
      console.warn("Número máximo de tentativas de reconexão atingido.");
      return;
    }

    tentativasRef.current += 1;
    console.log(`Tentando reconectar... tentativa ${tentativasRef.current}`);

    return;
    if (playerRef.current) {
      setIsRefreshing(true);
      setIsReconnecting(true);

      internalApi.get(`/${watchUrl}/watch/${item_id}`).then((resp) => {
        if (resp.data.url == "") return;

        const urlSplitted = resp.data.url.split("k=")[1];
        CookieServices.setWatchToken(urlSplitted);

        playerRef.current.reset();
        playerRef.current.src({
          src: resp.data.url,
          type: "application/x-mpegURL",
        });
        playerRef.current.load();
        playerRef.current.play().catch(() => {});
      });
    }
  };

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

      player.on("durationchange", () => {
        const duration = player.duration();
        if (isFinite(duration) && duration > 0) {
          console.log("⚠️ Transmissão ao vivo encerrada.");
          reconnect();
        }
      });

      player.on("error", () => {
        console.error("Erro no vídeo. Tentando reconectar...");
        reconnect();
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

  /*  useEffect(() => {
    const interval = setInterval(() => {
      if (
        playerRef.current &&
        typeof playerRef.current.duration === "function" &&
        typeof playerRef.current.paused === "function"
      ) {
        const duration = playerRef.current.duration();
        const isPlaying = !playerRef.current.paused();

        if ((duration === Infinity || duration === 0) && isPlaying) {
          console.log("🟢 Transmissão ao vivo ativa e em reprodução.");
        } else if (isPlaying && isFinite(duration)) {
          console.warn(
            "⚠️ Possível interrupção na transmissão. Tentando reconectar..."
          );
          reconnect();
        }
      }
    }, INTERVALO_RECONEXAO);

    return () => clearInterval(interval);
  }, []); */

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
