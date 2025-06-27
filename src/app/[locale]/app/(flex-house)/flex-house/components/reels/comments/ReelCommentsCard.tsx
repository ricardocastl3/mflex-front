import { BaseBox } from "@/@components/(box)/BaseBox";
import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";

import CRTPostDescription from "../../geral/CRTPostDescription";
import CRTCommentContainer from "../../geral/comments/CRTCommentContainer";

export default function ReelCommentCard({ post }: { post: ICreatorPost }) {
  return (
    <div>
      <BaseBox className="p-4 flex flex-col gap-3 w-full h-full flex-1">
        <CRTPostDescription showFile={false} post={post} />
        <CRTCommentContainer displayMode="both" resource={post} />
      </BaseBox>
    </div>
  );
}
