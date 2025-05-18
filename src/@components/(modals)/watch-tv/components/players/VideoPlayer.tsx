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
  const tentativasRef = useRef(0);
  const MAX_TENTATIVAS = 10;
  const INTERVALO_RECONEXAO = 3000; // 3 segundos

  const [isRefreshing, setIsRefreshing] = useState(true);
  const [checkUser, setCheckUser] = useState(false);

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

  const reconnect = () => {
    if (tentativasRef.current >= MAX_TENTATIVAS) {
      console.warn("Número máximo de tentativas de reconexão atingido.");
      return;
    }

    tentativasRef.current += 1;
    console.log(`Tentando reconectar... tentativa ${tentativasRef.current}`);

    setTimeout(() => {
      if (playerRef.current) {
        setIsRefreshing(true);
        playerRef.current.reset();
        playerRef.current.src({ src, type: "application/x-mpegURL" });
        playerRef.current.load();
        playerRef.current.play().catch(() => {});
      }
    }, INTERVALO_RECONEXAO);
  };

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

      /*
      let duracaoAnterior = Infinity;

      const liveReconnecting = () => {
        reconnect();
      };

      playerRef.current.on("durationchange", () => {
        const novaDuracao = playerRef.current.duration();

        if (
          duracaoAnterior === Infinity &&
          isFinite(novaDuracao) &&
          novaDuracao !== 0
        ) {
          liveReconnecting();
        }

        duracaoAnterior = novaDuracao;
      });
*/

      playerRef.current.on("error", () => {
        console.error("Erro no vídeo. Tentando reconectar...");
        reconnect();
      });

      playerRef.current.on("playing", () => {
        setCheckUser(true);
        setIsRefreshing(false);
        tentativasRef.current = 0; // resetar tentativas ao voltar
      });

      playerRef.current.on("error", () => {
        console.error("Erro no vídeo. Tentando reconectar...");
        setIsRefreshing(true);
        setTimeout(() => {
          if (playerRef.current) {
            playerRef.current.reset();
            playerRef.current.src({ src, type: "application/x-mpegURL" });
            playerRef.current.load();
            playerRef.current.play().catch(() => {});
          }
        }, 3000);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        playerRef.current &&
        typeof playerRef.current.duration === "function" &&
        typeof playerRef.current.playing === "function"
      ) {
        const duracao = playerRef.current.duration();
        const isPlaying = playerRef.current.playing();

        if ((duracao === Infinity || duracao === 0) && isPlaying) {
          console.log("🟢 Transmissão ao vivo ativa e em reprodução.");
        } else {
          reconnect(); // se necessário
        }
      }
    }, INTERVALO_RECONEXAO); // a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {isRefreshing && (
        <div className="absolute inset-0 flex justify-center items-center z-20 bg-black">
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
