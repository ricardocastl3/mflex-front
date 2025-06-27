import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";
import { ICreatorFollowing } from "@/http/interfaces/models/fhouse/ICreatorFollowing";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function CreatorAvatar({
  following,
}: {
  following?: ICreatorFollowing;
}) {
  return (
    <Link
      href={`/${langByCookies}/app/flex-house/${following?.creator?.username}`}
    >
      <div className="flex items-center gap-2 w-full">
        <div className="">
          <AuSoftUI.Component.Avatar
            size={43}
            width={43}
            wsite="w-fit"
            src={
              following?.creator?.user.photo || localImages.logos.flexUser.src
            }
          />
        </div>
        <div className="flex flex-col gap-[0.08rem] w-full">
          <div className="flex items-center justify-between gap-4 w-[10rem]">
            <h1 className="text-[0.8rem] font-bold truncate dark:text-white">
              {`${following?.creator?.user.first_name} ${following?.creator?.user.last_name}`}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xs dark:text-yellow-400 text-yellow-600">
              <CTranslateTo eng="Creator" pt="Criador(a)" />
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
}
