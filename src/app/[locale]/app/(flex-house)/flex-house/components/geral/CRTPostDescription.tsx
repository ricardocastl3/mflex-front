import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { Dispatch, SetStateAction } from "react";
import { ReactIcons } from "@/utils/icons";

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
            <div
              style={{
                width: "100%",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${post.image})`,
              }}
              className="rounded-md h-[300px] md:h-[200px] bg-slate-200 dark:bg-slate-800/50"
            ></div>
          )}

          {post.type == "reel" && showFile && (
            <div
              onClick={() => {}}
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
