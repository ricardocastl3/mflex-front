import { useAppProvider } from "@/providers/app/AppProvider";
import { useMusicProvider } from "@/providers/features/MusicProvider";
import { IMusic } from "@/http/interfaces/models/artists/IMusic";

import ASoundPlayer from "@/@components/(system)/ASoundPlayer";
import Siriwave from "react-siriwave";
import MusicPlayerProgress from "./MusicPlayerProgress";

export default function MusicPlayer({ music }: { music: IMusic }) {
  const { isDarkMode } = useAppProvider();
  const { isPlayingMusic } = useMusicProvider();

  return (
    <div
      style={{
        backgroundImage: `url(${music.cover})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        objectFit: "cover",
      }}
      className="relative md:h-[50vh] h-[30vh] dark:bg-ausoft-slate-950 bg-slate-100 flex flex-col justify-center items-center md:rounded-xl rounded-none w-full"
    >
      <div className="absolute bg-black/60 inset-0 flex justify-center items-center md:rounded-xl rounded-none">
        <Siriwave
          color={isDarkMode ? "#e39d4d" : "#e39d4d"}
          theme="ios"
          width={window.innerWidth > 765 ? 600 : 200}
          autostart={isPlayingMusic ? true : false}
          cover
          speed={0.2}
        />
        <div className="flex flex-col gap-8 absolute justify-center items-center">
          <ASoundPlayer url={music.url} size="40" />
          <div className="md:w-[50vw] w-[70vw] h-fit">
            <MusicPlayerProgress music={music} />
          </div>
        </div>
      </div>
    </div>
  );
}
