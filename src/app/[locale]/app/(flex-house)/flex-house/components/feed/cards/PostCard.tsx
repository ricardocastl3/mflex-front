import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useCallback, useEffect, useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi } from "@/http/axios/api";
import { useResourceProvider } from "@/providers/features/ResourceProvider";

import CRTPostDescription from "../../geral/CRTPostDescription";
import CRTCommentContainer from "../../geral/comments/CRTCommentContainer";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function PostCard({ post }: { post: ICreatorPost }) {
  const [openComments, setOpenComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ICreatorPost | undefined>();

  const { fetchResource } = useResourceProvider();

  const fetchPost = useCallback(async () => {
    try {
      const resp = await internalApi.get("/creators/posts", {
        params: { id: post.id },
      });

      setSelectedPost(resp.data.post);
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (fetchResource) fetchPost();
  }, [fetchResource]);

  return (
    <div
      className={`${
        openComments
          ? "fixed duration-0 z-30 inset-0 md:dark:bg-black/50 md:bg-black/80 bg-white dark:bg-[#0f121c] flex justify-center"
          : ""
      }`}
    >
      {openComments && (
        <>
          <div className="md:flex hidden fixed top-8 right-8">
            <AuSoftUI.UI.Button
              onClick={() => setOpenComments(false)}
              className="rounded-full font-bold bg-white dark:bg-slate-800 text-black dark:text-white px-3.5 items-center justify-center"
              variant={"default"}
            >
              X
            </AuSoftUI.UI.Button>
          </div>
          <div className="md:hidden flex z-40 dark:bg-[#0f121c] bg-white p-4 absolute top-0 inset-x-0 border-b border-slate-300/90 dark:border-slate-800 ">
            <button
              onClick={() => setOpenComments(false)}
              className="md:w-[20vw] w-[80vw] dark:text-white text-base font-bold flex items-center gap-4"
            >
              <ReactIcons.PiIcon.PiCaretLeft size={25} />
              <p className="truncate">
                <CTranslateTo eng="Post: " pt="Publicação de:" />{" "}
                {` Ricardo Castle`}
              </p>
            </button>
          </div>
        </>
      )}
      <div
        className={`${
          openComments
            ? " md:animate-fade-up animate-fill-forwards h-[100vh] scrollbar-hide overflow-y-auto md:pt-8 pt-0 md:pb-8 pb-0 md:pr-3 pr-0"
            : ""
        }`}
      >
        <BaseBox
          className={`${
            openComments
              ? "md:w-[40vw] w-[100vw] md:rounded-xl rounded-none md:pt-4 pt-[5rem] md:px-4 px-4 md:h-fit h-fit"
              : "mb-4 md:p-4 p-3 "
          }  flex flex-col gap-4`}
        >
          <CRTPostDescription
            openComments={openComments}
            setOpenComments={setOpenComments}
            post={selectedPost || post}
          />
          {openComments && (
            <CRTCommentContainer
              displayMode="both"
              resource={selectedPost || post}
            />
          )}
        </BaseBox>
      </div>
    </div>
  );
}
