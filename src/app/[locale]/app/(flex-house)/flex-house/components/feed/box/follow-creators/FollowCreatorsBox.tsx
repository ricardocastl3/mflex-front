import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { localImages } from "@/utils/images";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CreatorAvatar from "./CreatorAvatar";
import Image from "next/image";

export default function FollowCreatorsBox() {
  const { userLogged } = useAuth();

  const following = userLogged?.following.filter(
    (i) => i.follower_id == userLogged?.id
  );

  return (
    <>
      <BaseBox className="w-full p-2">
        <div className="p-2 border-b pb-2 border-r-slate-200 dark:border-slate-800">
          <h1 className="text-sm dark:text-white font-bold flex items-center gap-2">
            <ReactIcons.AiICon.AiOutlineUser size={15} />
            <CTranslateTo eng="Creators Following" pt="Criadores que sigo" />
          </h1>
        </div>

        {following?.length! > 0 && (
          <>
            <div className="mt-3 mb-2 flex flex-col gap-5 h-[50vh] overflow-y-auto p-2">
              {following?.map((creator, i) => {
                return <CreatorAvatar following={creator} key={i} />;
              })}
            </div>
          </>
        )}

        {following && following?.length <= 0 && (
          <div className="flex items-center flex-col gap-3 py-8">
            <Image
              width={30}
              height={30}
              alt="Empty"
              src={localImages.vectors.emptyBox}
            />
            <h1 className="text-sm text-center dark:text-white">
              <CTranslateTo
                eng="Not following anyone yet"
                pt="Ainda não está seguindo ninguém"
              />
            </h1>
          </div>
        )}
      </BaseBox>
    </>
  );
}
