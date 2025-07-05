import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { Dispatch, SetStateAction } from "react";
import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { useResourceProvider } from "@/providers/features/ResourceProvider";
import { useAuth } from "@/providers/auth/AuthProvider";

import LikeResourceButton from "@/app/[locale]/(site)/components/likes/LikeResourceButton";
import MusicViews from "@/app/[locale]/app/(artist)/art-musics/components/MusicViews";
import FormattersServices from "@/services/FormattersServices";

export default function CreatorPostMiniDetails({
  views,
  post,
  openComments,
  setOpenComments,
  show,
}: {
  show: {
    views: boolean;
  };
  post?: ICreatorPost;
  views: number;
  openComments?: boolean;
  setOpenComments?: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleOpenModal } = useModal();
  const { handleSelectResource } = useResourceProvider();
  const { userLogged } = useAuth();

  return (
    <div className="flex items-center w-full justify-between gap-3.5 border-t border-b pt-2 pb-2 border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3.5">
        <LikeResourceButton resource={post} pulse={false} />
        {show.views && <MusicViews views={post?.views.length!} />}
        {setOpenComments && (
          <AuSoftUI.UI.Button
            onClick={() => setOpenComments((state) => !state)}
            className="items-center text-slate-600 dark:text-slate-400 py-1.5 px-2.5 border-none"
            variant={"outline"}
            size={"sm"}
          >
            <ReactIcons.AiICon.AiOutlineMessage size={15} />
            <p className="">
              {FormattersServices.formatNumberByMillions(
                post?.comments.length!
              )}
            </p>
          </AuSoftUI.UI.Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {userLogged?.id != post?.author?.user.id && (
          <AuSoftUI.UI.Button
            onClick={() => {
              handleSelectResource(post);
              handleOpenModal("ct-complaint");
            }}
            className="items-center py-1.5 px-2.5"
            variant={"outline"}
            size={"sm"}
          >
            <ReactIcons.MdIcon.MdReport size={20} />
          </AuSoftUI.UI.Button>
        )}
        <AuSoftUI.UI.Button
          onClick={() => {
            handleSelectResource(post);
            handleOpenModal("ct-share-post");
          }}
          className="items-center py-1.5 px-2.5"
          variant={"outline"}
          size={"sm"}
        >
          {post?.shares.length}
          <ReactIcons.PiIcon.PiShareFatBold size={14} />
        </AuSoftUI.UI.Button>
      </div>
    </div>
  );
}
