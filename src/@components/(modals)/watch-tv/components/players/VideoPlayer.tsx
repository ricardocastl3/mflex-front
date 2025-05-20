import React, { useRef, useEffect, useState } from "react";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";
import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { internalApi } from "@/http/axios/api";

interface Props {
  item_id: string;
}

const VideoPlayer: React.FC<Props> = ({ item_id }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const tentativasRef = useRef(0);
  const MAX_TENTATIVAS = 15;
  const INTERVALO_RECONEXAO = 3000; // 3 segundos

  const [isRefreshing, setIsRefreshing] = useState(true);
  const [checkUser, setCheckUser] = useState(false);
  const [initialSRC, setInitialSrc] = useState("");

  const { userLogged } = useAuth();
  const { handleOpenModal } = useModal();
  const { selectedFlexTV } = useFlexTVProvider();

  const watchUrl = selectedFlexTV ? "streams" : "movies";

  useEffect(() => {
    internalApi.get(`/${watchUrl}/watch/${item_id}`).then((e) => {
      setInitialSrc(e.data.url);
    });
  }, []);

  useEffect(() => {
    if (checkUser) {
      setTimeout(() => {
        if (!userLogged) {
          handleOpenModal("watch-no-ads");
        }
      }, 60000);
    }
  }, [checkUser]);

  const reconnect = () => {
    if (tentativasRef.current >= MAX_TENTATIVAS) {
      console.warn("Número máximo de tentativas de reconexão atingido.");
      return;
    }

    tentativasRef.current += 1;
    console.log(`Tentando reconectar... tentativa ${tentativasRef.current}`);

    if (playerRef.current) {
      setTimeout(async () => {
        setIsRefreshing(true);
        //const res = await internalApi.get(`/streams/watch/${item_id}`);
        //const newSrc = res.data.url;

        playerRef.current.reset();
        playerRef.current.src({
          src: initialSRC,
          type: "application/x-mpegURL",
        });
        playerRef.current.load();
        playerRef.current.play().catch(() => {});
      }, 40000);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        playerRef.current &&
        typeof playerRef.current.duration === "function" &&
        typeof playerRef.current.paused === "function"
      ) {
        const duration = playerRef.current.duration();
        const isPlaying = !playerRef.current.paused();

        if ((duration === Infinity || duration === 0) && isPlaying) {
          //  console.log("🟢 Transmissão ao vivo ativa e em reprodução.");
        } else if (isPlaying && isFinite(duration)) {
          /*console.warn(
            "⚠️ Possível interrupção na transmissão. Tentando reconectar..."
          );*/
          reconnect();
        }
      }
    }, INTERVALO_RECONEXAO);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {isRefreshing && (
        <div className="absolute inset-0 flex flex-col gap-2 justify-center items-center z-20 bg-black">
          <div className="flex flex-col gap-4 md:w-[50vw] w-[90vw] items-center justify-center text-center">
            <ReactIcons.CgIcon.CgSpinner
              size={35}
              className="text-white animate-spin"
            />

            <h1 className="text-white text-base hidden">
              <CTranslateTo
                eng="The broadcast is under maintenance, we will resume soon..."
                pt="A transmissão está em manutenção, em breve retomaremos..."
              />
            </h1>
          </div>
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
