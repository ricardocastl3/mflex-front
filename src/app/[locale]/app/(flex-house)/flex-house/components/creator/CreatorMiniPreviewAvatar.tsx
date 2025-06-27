import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";
import { ResourceType } from "@/providers/features/ResourceProvider";
import { ICreator } from "@/http/interfaces/models/fhouse/ICreator";
import { useAuth } from "@/providers/auth/AuthProvider";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import DateServices from "@/services/DateServices";
import Link from "next/link";

export default function CreatorMiniPreviewAvatar({
  resource,
  creator,
  title_color = "dark:text-white",
}: {
  resource: ResourceType;
  title_color?: string;
  creator?: ICreator;
}) {
  return (
    <Link href={`/${langByCookies}/app/flex-house/${creator?.username}`}>
      <div className="flex items-center gap-2 w-full">
        <div className="w-[50px]">
          <AuSoftUI.Component.Avatar
            size={43}
            width={43}
            wsite=""
            src={creator?.user.photo || localImages.logos.flexUser.src}
          />
        </div>
        <div className="flex flex-col gap-[0.08rem] w-full">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="md:w-[14rem] w-[35vw]">
              <h1 className={`${title_color} text-sm font-bold truncate `}>
                {`${creator?.user.first_name} ${creator?.user.last_name}`}
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
              {DateServices.normalize(resource?.created_at!)}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
}
