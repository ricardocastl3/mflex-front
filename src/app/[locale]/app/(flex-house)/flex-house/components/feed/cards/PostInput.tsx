import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { langByCookies } from "@/http/axios/api";
import { localImages } from "@/utils/images";
import { useModal } from "@/providers/app/ModalProvider";
import { useAuth } from "@/providers/auth/AuthProvider";

import PostInputButtonPost from "./PostInputButtonPost";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function PostInput() {
  const { handleOpenModal } = useModal();
  const { userLogged } = useAuth();

  return (
    <div className="relative">
      {!userLogged?.creator && (
        <div className="absolute inset-0 dark:bg-black/50 bg-white/60 z-10 rounded-xl flex-col gap-2 flex items-center justify-center text-center">
          <h1 className="text-sm dark:text-white text-center">
            <CTranslateTo
              eng="To post something it needs to be created"
              pt="Para postar alguma coisa precisas ser criador"
            />
          </h1>
          <Link href={`/${langByCookies}/app/creator`}>
            <AuSoftUI.UI.Button
              size={"sm"}
              variant={"default"}
              className="rounded-full"
            >
              <CTranslateTo
                eng="I want to be a creator"
                pt="Quero ser criador"
              />
            </AuSoftUI.UI.Button>
          </Link>
        </div>
      )}
      <BaseBox className="p-4 mb-4 flex flex-col gap-3">
        <div className="w-full flex items-center gap-2 mt-4">
          <div>
            <AuSoftUI.Component.Avatar
              size={43}
              width={43}
              wsite=""
              src={userLogged?.photo || localImages.logos.flexUser.src}
            />
          </div>
          <AuSoftUI.UI.TextField.Default
            onClick={() => handleOpenModal("ct-publish-image")}
            placeholder={`${
              langByCookies == "pt"
                ? "Em que estas a pensar?....."
                : "What are you thinking about?....."
            }`}
            className="flex-1 flex  bg-slate-100 dark:bg-slate-800/40 focus:none h-[8vh] w-full"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
          <PostInputButtonPost
            Icon={ReactIcons.AiICon.AiFillFileImage}
            action="ct-publish-image"
            color="text-yellow-500 dark:text-yellow-500 hover:bg-yellow-100 hover:dark:bg-yellow-800/20"
            t_en="Imagem"
            t_pt="Imagem"
          />
          <PostInputButtonPost
            Icon={ReactIcons.AiICon.AiFillCamera}
            action="ct-publish-video"
            color="text-emerald-500 dark:text-emerald-500 hover:bg-emerald-100 hover:dark:bg-emerald-800/20"
            t_en="Video"
            t_pt="Vídeo"
          />
          <PostInputButtonPost
            Icon={ReactIcons.RxIcon.RxText}
            action="ct-publish-image"
            color="text-blue-500 dark:text-blue-500 hover:bg-blue-100 hover:dark:bg-blue-800/20"
            t_en="Text"
            t_pt="Texto"
          />
        </div>
      </BaseBox>
    </div>
  );
}
