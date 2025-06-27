import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { localImages } from "@/utils/images";
import { useAuth } from "@/providers/auth/AuthProvider";
import { ICreator } from "@/http/interfaces/models/fhouse/ICreator";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CreatorStat from "./CreatorStat";
import useOwnCreatorPost from "@/hooks/api/creators/useOwnCreatorPost";

export default function CreatorBox({ creator }: { creator?: ICreator }) {
  const { userLogged } = useAuth();
  const { allCreatorPosts } = useOwnCreatorPost({ side: "box" });

  return (
    <BaseBox className="">
      <div className="relative">
        <div
          style={{
            height: "80px",
            width: "100%",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${
              userLogged?.creator?.cover || localImages.bgs.artistProfileBg.src
            })`,
          }}
          className="rounded-t-xl relative"
        ></div>
        <div className="absolute -bottom-4 inset-x-0 justify-center flex">
          <AuSoftUI.Component.Avatar
            size={45}
            width={45}
            wsite=""
            src={userLogged?.photo || localImages.logos.flexUser.src}
          />
        </div>
      </div>
      <div className="mt-4 p-4 flex justify-center flex-col gap-2">
        <div className="text-center flex-col flex items-center gap-1">
          <h1 className="font-bold dark:text-white text-sm">{`${userLogged?.first_name} ${userLogged?.last_name}`}</h1>
          <p className="text-sm dark:text-slate-400 text-slate-600">
            {userLogged?.creator?.biography}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t pt-2 border-slate-200 dark:border-slate-800">
          <CreatorStat
            color="bg-yellow-100 dark:bg-yellow-800/10 dark:text-yellow-500 text-yellow-600"
            t_en="Followers"
            t_pt="Seguidores"
            value={
              userLogged?.creator?.followers.filter(
                (i) => i.creator_id == userLogged.creator?.id
              ).length!
            }
          />
          <CreatorStat
            color="bg-blue-200/50 dark:bg-blue-800/10 dark:text-blue-500 text-blue-600"
            t_en="Posts"
            t_pt="Postagens"
            value={
              allCreatorPosts.posts.filter((i) => i.type == "image").length
            }
          />
          <CreatorStat
            color="bg-emerald-100 dark:bg-emerald-800/10 dark:text-emerald-500 text-emerald-600"
            t_en="Videos"
            t_pt="Vídeos"
            value={allCreatorPosts.posts.filter((i) => i.type == "reel").length}
          />
        </div>
        {userLogged?.creator && (
          <AuSoftUI.UI.Button
            variant={"primary"}
            size={"sm"}
            className="rounded-full hidden py-2 w-full justify-center"
          >
            <CTranslateTo
              eng="I want to be creator"
              pt="Quero ser criador 😀"
            />
          </AuSoftUI.UI.Button>
        )}
      </div>
    </BaseBox>
  );
}
