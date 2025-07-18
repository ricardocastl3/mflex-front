import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { Dispatch, SetStateAction, useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";

import CreatorMiniPreviewAvatar from "../creator/CreatorMiniPreviewAvatar";
import CreatorPostMiniDetails from "../creator/CreatorPostMiniDetails";
import FormmattedDescription from "@/app/[locale]/(site)/components/comments/FormmattedDescription";
import FormattedBreakDescription from "@/app/[locale]/(site)/components/comments/FormattedBreakDescription";

export default function CRTPostDescription({
  post,
  openComments,
  showFile = true,
  setOpenComments,
}: {
  openComments?: boolean;
  setOpenComments?: Dispatch<SetStateAction<boolean>>;
  post: ICreatorPost;
  showFile?: boolean;
}) {
  const { handleSelectFHCreatorReel, handleShowPreviewReelModal } =
    useFlexHouseProvider();

  const [isLoadingImage, setIsLoadingImage] = useState(true);

  function handleOpenReel() {
    handleSelectFHCreatorReel(post);
    handleShowPreviewReelModal(true);
    if (setOpenComments) setOpenComments(false);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 w-full">
        <CreatorMiniPreviewAvatar creator={post.author} resource={post} />

        {(post.image || post.type == "reel") && (
          <div className="w-full">
            <FormattedBreakDescription post={post} type="post" />
          </div>
        )}

        {!post.image && post.type != "reel" && (
          <FormmattedDescription description={post.description} type="post" />
        )}

        <div className="flex flex-col gap-2">
          {post?.image && (
            <>
              {isLoadingImage && (
                <div className="p-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800/50"></div>
              )}
              <img
                src={post.image}
                onLoad={() => setIsLoadingImage(false)}
                alt="post"
                className={`rounded-md bg-slate-200 dark:bg-slate-800/50 w-full ${
                  openComments
                    ? "max-h-[300px]  md:max-h-[300px] "
                    : "max-h-[800px]  md:max-h-[500px]"
                } object-contain`}
              />
            </>
          )}

          {post.type == "reel" && showFile && (
            <div
              onClick={handleOpenReel}
              className="z-10 w-full md:h-[250px] h-[200px] p-8 rounded-md cursor-pointer relative"
            >
              <video
                muted={true}
                playsInline
                className="animate-fade absolute z-0 rounded-xl inset-0 h-full w-full object-cover cursor-pointer"
              >
                <source
                  src={`${process.env.MFLEX_SERVER_URL}/reels/${post.id}`}
                  type="video/mp4"
                />
              </video>

              {/* Play/Pause overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="bg-black bg-opacity-50 rounded-full p-2">
                  <ReactIcons.AiICon.AiFillPlayCircle
                    size={30}
                    className="text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <CreatorPostMiniDetails
          show={{ views: post.type == "reel" ? true : false }}
          openComments={openComments}
          setOpenComments={setOpenComments}
          post={post}
          views={0}
        />
      </div>
    </div>
  );
}
