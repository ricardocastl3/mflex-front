"use client";

import React from "react";
import VideoLoading from "./VideoLoading";

import { useState } from "react";

export default function VideoBackground({
  fallback_url,
  video_url,
}: {
  video_url: string;
  fallback_url: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <video
        onError={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        loop
        muted
        autoPlay
        playsInline
        className="animate-fade absolute z-0 inset-0 h-full w-full object-cover"
      >
        <source src={video_url} type="video/mp4" />
      </video>
      <VideoLoading isLoading={isLoading} image={fallback_url} />
    </>
  );
}
