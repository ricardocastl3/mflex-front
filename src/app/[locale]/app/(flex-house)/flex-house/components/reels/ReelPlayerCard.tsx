import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";
import { ReactIcons } from "@/utils/icons";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";
import { internalApi } from "@/http/axios/api";
import { useResourceProvider } from "@/providers/features/ResourceProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CreatorMiniPreviewAvatar from "../creator/CreatorMiniPreviewAvatar";
import FormattersServices from "@/services/FormattersServices";

export default function ReelPlayerCard({ post }: { post: ICreatorPost }) {
  const {
    handleOpenReelCommentContainer,
    openReelCommentContainer,
    handleShowPreviewReelModal,
    handleSelectFHCreatorReel,
  } = useFlexHouseProvider();

  const { selectedResource, handleSelectResource } = useResourceProvider();

  const { userLogged } = useAuth();

  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedVideoIdRef = useRef<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [bufferingProgress, setBufferingProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Error toggling video playback:", error);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = async () => {
        setIsPlaying(false);
        video.currentTime = 0;
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error restarting video:", error);
        }
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("ended", handleEnded);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  // useEffect para carregar o vídeo apenas uma vez
  useEffect(() => {
    const video = videoRef.current;
    if (video && loadedVideoIdRef.current !== post.id) {
      setIsLoading(true);
      setIsBuffering(true);
      setBufferingProgress(0);
      loadedVideoIdRef.current = post.id;

      // Ajusta qualidade baseado na conexão
      adjustVideoQuality();

      // Listener para início do carregamento
      const handleLoadStart = () => {
        setIsLoading(true);
        setIsBuffering(true);
        setBufferingProgress(0);
      };

      // Listener para progresso de carregamento
      const handleProgress = () => {
        if (video.buffered.length > 0 && video.duration > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          const duration = video.duration;
          const progress = (bufferedEnd / duration) * 100;

          // Atualiza o progresso apenas se for maior que o anterior
          setBufferingProgress((prev) => Math.max(prev, progress));

          // Se o buffer estiver suficiente para reprodução, para de mostrar loading
          if (progress > 10) {
            setIsLoading(false);
          }
        }
      };

      // Listener para quando o vídeo terminar de carregar
      const handleLoadedData = () => {
        setIsLoading(false);
        setIsBuffering(false);
        setBufferingProgress(100);
        console.log("Video loaded completely");

        // Tenta reproduzir automaticamente após carregar
        if (video.readyState >= 2) {
          Promise.resolve(video.play()).catch(console.error);
        }
      };

      // Listener para quando o buffer estiver pronto para reprodução
      const handleCanPlay = () => {
        setIsBuffering(false);
        if (!isPlaying) {
          Promise.resolve(video.play()).catch(console.error);
        }
      };

      // Listener para quando o buffer estiver vazio
      const handleWaiting = () => {
        setIsBuffering(true);
        console.log("Video waiting for more data");
      };

      // Listener para quando o buffer estiver cheio
      const handleCanPlayThrough = () => {
        setIsBuffering(false);
        console.log("Video can play through without buffering");
      };

      // Adiciona todos os listeners
      video.addEventListener("loadstart", handleLoadStart);
      video.addEventListener("progress", handleProgress);
      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("waiting", handleWaiting);
      video.addEventListener("canplaythrough", handleCanPlayThrough);

      // Garante que o vídeo seja carregado corretamente
      video.load();

      return () => {
        video.removeEventListener("loadstart", handleLoadStart);
        video.removeEventListener("progress", handleProgress);
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("waiting", handleWaiting);
        video.removeEventListener("canplaythrough", handleCanPlayThrough);
      };
    }
  }, [post.id, isPlaying]);

  // useEffect para registrar visualização
  useEffect(() => {
    if (loadedVideoIdRef.current === post.id) {
      const findView = post.views.find((i) => i.user.id == userLogged?.id);
      if (!findView) {
        internalApi.post("/users/vs", {
          id: post.id,
        });
      }
    }
  }, [post.id, userLogged?.id]);

  // Função para detectar velocidade da conexão e ajustar qualidade
  const adjustVideoQuality = () => {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection.effectiveType;
      const downlink = connection.downlink;

      // Ajusta preload baseado na velocidade
      if (videoRef.current) {
        if (downlink < 2) {
          // Conexão lenta - carrega apenas metadata
          videoRef.current.preload = "metadata";
        } else if (downlink < 5) {
          // Conexão média - carrega alguns segundos
          videoRef.current.preload = "auto";
        } else {
          // Conexão rápida - carrega mais conteúdo
          videoRef.current.preload = "auto";
        }
      }
    }
  };

  // Função para pré-carregar o próximo vídeo
  const preloadNextVideo = (nextPostId: string) => {
    const preloadVideo = document.createElement("video");
    preloadVideo.preload = "metadata";
    preloadVideo.src = `${process.env.MFLEX_SERVER_URL}/reels/${nextPostId}`;

    preloadVideo.addEventListener("loadedmetadata", () => {});
    preloadVideo.load();
  };

  return (
    <div className="relative h-full">
      <div className="flex z-10 bg-black/20 p-4 absolute top-0 inset-x-0">
        <button
          onClick={() => {
            handleOpenReelCommentContainer(false);
            handleSelectFHCreatorReel(undefined);
            handleSelectResource(undefined);
            handleShowPreviewReelModal(false);
          }}
          className="text-white text-lg font-bold flex items-center gap-4"
        >
          <ReactIcons.PiIcon.PiCaretLeft size={28} />
          <p>
            <CTranslateTo eng="Reels" pt="Reels" />
          </p>
        </button>
      </div>
      <div
        onClick={handleVideoClick}
        className="z-10 flex items-center md:w-[30vw] w-full justify-center h-full cursor-pointer"
      >
        <video
          ref={videoRef}
          loop
          muted={isMuted}
          onLoadedData={() => setIsLoading(false)}
          playsInline
          preload="metadata"
          className="animate-fade z-0 h-full w-full rounded-md object-cover cursor-pointer"
        >
          <source
            src={`${process.env.MFLEX_SERVER_URL}/reels/${post.id}`}
            typobject-containe="video/mp4"
          />
        </video>

        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="bg-black bg-opacity-50 rounded-full p-4">
              <ReactIcons.AiICon.AiFillPlayCircle
                size={48}
                className="text-white"
              />
            </div>
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center z-0 w-full">
            <div className="bg-black bg-opacity-50 rounded-full p-4">
              <ReactIcons.PiIcon.PiSpinner
                size={48}
                className="text-white animate-spin"
              />
            </div>
          </div>
        )}
      </div>

      <div className="md:flex absolute z-10 inset-0 left-[83%]">
        <div className="absolute z-10 top-4 right-6 flex flex-col gap-4">
          <button
            onClick={toggleMute}
            className="text-white flex flex-col items-center gap-2 font-bold text-xs"
          >
            {isMuted ? (
              <ReactIcons.Io5Icon.IoVolumeMute size={25} />
            ) : (
              <ReactIcons.VSCIcon.VscUnmute size={25} />
            )}
          </button>
        </div>
        <div className="absolute z-10 top-[50%] right-6 flex flex-col gap-4">
          <button
            onClick={() => {
              handleOpenReelCommentContainer(!openReelCommentContainer);
            }}
            className="text-white flex flex-col gap-2 items-center font-bold text-sm"
          >
            <ReactIcons.AiICon.AiFillMessage size={33} />
            <p>
              {FormattersServices.formatNumberByMillions(
                selectedResource?.comments.length || post.comments.length
              )}
            </p>
          </button>

          <span className="text-white flex flex-col items-center gap-2 font-bold text-sm">
            <ReactIcons.AiICon.AiFillPlayCircle size={33} />
            <p>
              {FormattersServices.formatNumberByMillions(
                (selectedResource &&
                  (selectedResource as ICreatorPost).views.length) ||
                  post.views.length
              )}
            </p>
          </span>
        </div>
      </div>

      <div className="flex z-10 bg-black/30 px-4 pt-4 pb-6 absolute bottom-0 inset-x-0">
        <CreatorMiniPreviewAvatar
          hasFollow={true}
          creator={post?.author}
          title_color="text-white"
          resource={post}
        />
      </div>
    </div>
  );
}
