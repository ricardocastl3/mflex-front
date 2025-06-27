import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";
import { ReactIcons } from "@/utils/icons";

import PostFooter from "./PostFooter";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import DateServices from "@/services/DateServices";
import FormmattedDescription from "@/app/[locale]/(site)/components/comments/FormmattedDescription";

export default function PostCard({ post }: { post: ICreatorPost }) {
  return (
    <div className={``}>
      <BaseBox
        className={`mb-4 md:p-4 p-3 flex flex-col gap-2 h-full justify-between`}
      >
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-2 w-full">
            <div className="w-[50px]">
              <AuSoftUI.Component.Avatar
                size={43}
                width={43}
                wsite=""
                src={
                  post?.author?.user?.photo || localImages.logos.flexUser.src
                }
              />
            </div>
            <div className="flex flex-col gap-[0.08rem] w-full">
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="md:w-[14rem] w-[35vw]">
                  <h1 className={`dark:text-white text-sm font-bold truncate `}>
                    {`${post?.author?.user.first_name} ${post?.author?.user?.last_name}`}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs font-bold dark:text-yellow-400 text-yellow-600">
                  <CTranslateTo eng="Creator" pt="Criador(a)" />
                </h1>
                <h1 className="text-[0.8rem] dark:text-slate-400 text-slate-600">
                  {"•"}
                </h1>
                <h1 className="text-[0.8rem] dark:text-slate-400 text-slate-600">
                  {DateServices.normalize(post?.created_at!)}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <FormmattedDescription description={post.description} type="post" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {post?.image && (
            <div
              style={{
                width: "100%",
                height: "150px",
                backgroundPosition: "center",
                backgroundSize: "cover",
                objectFit: "contain",
                backgroundImage: `url(${post.image})`,
              }}
              className="rounded-md"
            ></div>
          )}

          {post.type == "reel" && (
            <div
              onClick={() => {}}
              className="z-10 w-full h-[150px] p-8 rounded-md cursor-pointer relative"
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

          <PostFooter post={post} />
        </div>
      </BaseBox>
    </div>
  );
}
