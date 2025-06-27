import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";

import React from "react";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function ContentDropdown({
  callback,
}: {
  callback?: () => void;
}) {
  const { handleOpenModal } = useModal();
  return (
    <div className="md:w-[15vw] w-[82vw]">
      <div className="md:hidden flex items-center justify-between pb-2 mb-2 border-b  border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <AuSoftUI.Component.AuSoftLogo size={18} style="mb-1" />
          <h3 className="text-normal font-bold  dark:text-slate-100 ">
            <CTranslateTo pt="Nova postagem" eng="New Post" />
          </h3>
        </div>

        {callback && (
          <button
            onClick={callback}
            className="rounded-md pb-3 hover:opacity-80 text-slate-800 dark:text-slate-200"
          >
            <ReactIcons.BiIcon.BiX size={25} />
          </button>
        )}
      </div>
      <div className="flex flex-col">
        <button
          onClick={() => {
            {
              callback && callback();
            }
            handleOpenModal("ct-publish-image");
          }}
          className="flex items-center dark:text-white gap-2 p-3 text-sm font-bold rounded-md hover:bg-slate-200 hover:dark:bg-slate-800/60"
        >
          <ReactIcons.AiICon.AiFillFileImage size={15} />
          <CTranslateTo eng="Image" pt="Imagem" />
        </button>
        <button
          onClick={() => {
            {
              callback && callback();
            }
            handleOpenModal("ct-publish-video");
          }}
          className="flex items-center dark:text-white gap-2 p-3 text-sm font-bold rounded-md hover:bg-slate-200 hover:dark:bg-slate-800/60"
        >
          <ReactIcons.AiICon.AiFillPlayCircle size={15} />
          <CTranslateTo eng="Video" pt="Vídeo" />
        </button>
        <button className="flex items-center cursor-not-allowed dark:text-white gap-2 p-3 text-sm font-bold rounded-md opacity-60">
          <ReactIcons.AiICon.AiFillTag size={15} />
          <CTranslateTo eng="Ads Event" pt="Anunciar Evento" />
        </button>
        <button className="flex items-center cursor-not-allowed dark:text-white gap-2 p-3 text-sm font-bold rounded-md opacity-60">
          <ReactIcons.PiIcon.PiMusicNote size={15} />
          <CTranslateTo eng="Ads Music" pt="Anunciar Música" />
        </button>
      </div>
    </div>
  );
}
