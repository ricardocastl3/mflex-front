import { IMusicResponseAPI } from "@/http/interfaces/models/artists/IMusic";
import { ReactIcons } from "@/utils/icons";
import { useMusicProvider } from "@/providers/features/MusicProvider";
import { useState } from "react";
import { useModal } from "@/providers/app/ModalProvider";

import LoadMoreContent from "../../../@components/api-query-pages/LoadMoreContent";
import MusicStatus from "../components/MusicStatus";
import MusicViews from "../components/MusicViews";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import MusicDonations from "../components/MusicDonations";
import MusicDeletionModal from "../components/MusicDeletionModal";
import MusicCategory from "../components/MusicCategory";
import MusicMiniCoverPlayer from "../components/MusicMiniCoverPlayer";

export default function CardMusic({
  musicsAPI,
  isLoadingMore,
}: {
  isLoadingMore: boolean;
  musicsAPI: IMusicResponseAPI;
}) {
  const { handleSelectMusic } = useMusicProvider();
  const { handleOpenModal } = useModal();

  //Controls
  const [openBox, setOpenBox] = useState(false);

  const musics = musicsAPI.musics;

  MusicDeletionModal({ openBox, setOpenBox });

  return (
    <div className="flex flex-col w-full gap-4">
      <div>
        {musics.map((music, i) => {
          return (
            <div
              key={i}
              className="flex flex-col cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-800/50 p-4 border-b border-slate-300 dark:border-slate-800"
            >
              <MusicMiniCoverPlayer
                type="large"
                cover={music.cover}
                url={music.id}
              />

              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-0.5">
                  <h1 className="text-base dark:text-white font-bold mt-2">
                    {music.title}
                  </h1>
                  <div className="flex items-center gap-4 py-2">
                    <MusicStatus
                      status={
                        !music.is_public
                          ? "pending"
                          : music.is_online
                          ? "online"
                          : "offline"
                      }
                    />

                    <MusicViews views={music.views_count.length} />
                    <MusicDonations
                      donations={
                        music.music_donations ? music.music_donations.length : 0
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 border-t border-slate-300 dark:border-slate-700/50 flex items-center gap-3 flex-1 justify-self-end py-2">
                <button
                  onClick={() => {
                    handleSelectMusic(music);
                    setOpenBox(true);
                  }}
                  className="h-fit w-fit text-xs gap-1 px-2 py-0.5 rounded-xl hover:bg-red-300 bg-red-200 dark:bg-red-800/40 dark:text-red-400 text-red-800 flex items-center"
                >
                  <ReactIcons.HiIcon.HiTrash size={18} />
                  <CTranslateTo eng="Delete" pt="Eliminar" />
                </button>
                <button
                  onClick={() => {
                    handleSelectMusic(music);
                    handleOpenModal("art-add-music");
                  }}
                  className="h-fit w-fit text-xs gap-1 px-2 py-0.5 rounded-xl hover:bg-blue-300 hover:dark:bg-blue-900 bg-blue-200 dark:bg-blue-800/20 dark:text-blue-400 text-blue-800 flex items-center"
                >
                  <ReactIcons.HiIcon.HiTrash size={18} />
                  <CTranslateTo eng="Edit" pt="Editar" />
                </button>
                <MusicCategory
                  category={music.category ? music.category.name : "-------"}
                />
              </div>
            </div>
          );
        })}
      </div>
      <LoadMoreContent isLoading={isLoadingMore} />
    </div>
  );
}
