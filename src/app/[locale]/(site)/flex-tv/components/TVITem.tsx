import { BaseBox } from "@/@components/(box)/BaseBox";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { ReactIcons } from "@/utils/icons";
import { ITVChannelSafed } from "@/http/interfaces/models/ITVChannel";
import { localImages } from "@/utils/images";
import { langByCookies } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function TVItem({ item }: { item: ITVChannelSafed }) {
  const { handleSelectFlexTV } = useFlexTVProvider();
  const { handleOpenModal } = useModal();
  const { currentSubscription } = useAuth();

  return (
    <BaseBox className="p-3 flex w-full flex-col justify-between gap-4">
      <div className="flex flex-col gap-2">
        <img
          src={item.logo ? item.logo : localImages.logos.mflex.src}
          alt=""
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <h1 className="font-bold dark:text-white">{item.name}</h1>
          </div>
        </div>
      </div>

      {(item.me || item.public) && (
        <AuSoftUI.UI.Button
          onClick={() => {
            handleSelectFlexTV(item);
            handleOpenModal("watch-tv");
          }}
          variant={"outline"}
          className="items-center justify-center"
          size={"sm"}
        >
          <ReactIcons.MdIcon.MdTv size={14} />
          <CTranslateTo eng="Watch TV" pt="Assistir" />
        </AuSoftUI.UI.Button>
      )}
      {!item.me && !item.public&& (
        <Link href={`/${langByCookies}/pricing`} className="w-full">
          <AuSoftUI.UI.Button
            variant={"primary"}
            className="items-center justify-center w-full"
            size={"sm"}
          >
            <ReactIcons.MdIcon.MdTv size={14} />

            {currentSubscription && (
              <CTranslateTo eng="Updagre Plan" pt="Atualizar plano" />
            )}

            {!currentSubscription && (
              <CTranslateTo eng="Subscribe Plan" pt="Assinar um plano" />
            )}
          </AuSoftUI.UI.Button>
        </Link>
      )}
    </BaseBox>
  );
}
