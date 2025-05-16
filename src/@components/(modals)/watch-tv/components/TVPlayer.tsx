import { ITVChannelSafed } from "@/http/interfaces/models/ITVChannel";
import { useEffect, useState } from "react";
import { internalApi } from "@/http/axios/api";

import VideoPlayer from "./players/VideoPlayer";

export default function TVPlayer({ item }: { item: ITVChannelSafed }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    internalApi.get(`/streams/watch/${item.id}`).then((e) => {
      setUrl(e.data.url);
    });
  }, []);

  return (
    <div className="flex w-full h-full">
      {url != "" && <VideoPlayer src={`${url}`} />}
    </div>
  );
}
