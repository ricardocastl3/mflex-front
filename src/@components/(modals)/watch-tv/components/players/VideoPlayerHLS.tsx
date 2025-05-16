import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  url: string; // URL do arquivo m3u8
}

const VideoPlayerHLS: React.FC<VideoPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current?.play();
      });
      return () => {
        hls.destroy();
      };
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari nativo HLS
      videoRef.current.src = url;
      videoRef.current.play();
    }
  }, [url]);

  return <video ref={videoRef} controls style={{ width: "100%" }} />;
};

export default VideoPlayerHLS;
