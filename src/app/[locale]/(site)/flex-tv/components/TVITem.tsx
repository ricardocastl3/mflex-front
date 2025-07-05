import { BaseBox } from "@/@components/(box)/BaseBox";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { ReactIcons } from "@/utils/icons";
import { ITVChannelSafed } from "@/http/interfaces/models/tv/ITVChannel";
import { localImages } from "@/utils/images";
import { langByCookies } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import GAEventsServices from "@/services/google/GAEventsServices";

export default function TVItem({
  item,
  index,
}: {
  index: number;
  item: ITVChannelSafed;
}) {
  const { handleSelectFlexTV, handleSelectFlexTVMovie } = useFlexTVProvider();
  const { handleOpenModal } = useModal();
  const { currentSubscription } = useAuth();

  const router = useRouter();

  function handleSubscribe() {
    LocalStorageServices.resetAllKeys();
    LocalStorageServices.setWatchID(item.id);
    router.push(`/${langByCookies}/pricing`);
  }

  return (
    <motion.div
      initial={{ y: "9rem", opacity: 0 }}
      animate={{ y: "0rem", opacity: 1 }}
      transition={{ type: "spring", delay: 0.3 * index, duration: 2 }}
      className="w-full h-full"
    >
      <BaseBox className="p-3 flex w-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <img
            src={item.logo ? item.logo : localImages.logos.mflex.src}
            alt=""
            className="w-[40px] h-[20px] object-contain"
          />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-3">
              <h1 className="font-bold dark:text-white">
                {item.name
                  .replace("PT|", "")
                  .replace("BR|", "")
                  .replace("FHD", "")
                  .replace("HD", "")}
              </h1>
            </div>
          </div>
        </div>

        {(item.public ||
          (currentSubscription && currentSubscription?.flex_tv)) && (
          <AuSoftUI.UI.Button
            onClick={() => {
              handleSelectFlexTVMovie(undefined);
              handleSelectFlexTV(item);
              handleOpenModal("watch-tv");
              GAEventsServices.send({
                action: "buttonClicked",
                event_name: `watch-tv-${item.name
                  .toLowerCase()
                  .replaceAll("_", "")}`,
              });
            }}
            variant={"outline"}
            className="items-center justify-center"
            size={"sm"}
          >
            <ReactIcons.MdIcon.MdTv size={14} />
            <CTranslateTo eng="Watch TV" pt="Assistir" />
          </AuSoftUI.UI.Button>
        )}

        {!item.public &&
          ((currentSubscription && !currentSubscription.flex_tv) ||
            !currentSubscription) && (
            <AuSoftUI.UI.Button
              onClick={handleSubscribe}
              variant={"primary"}
              className="items-center justify-center w-full"
              size={"sm"}
            >
              <ReactIcons.MdIcon.MdTv size={14} />

              {currentSubscription &&
                (!currentSubscription.flex_tv ||
                  currentSubscription.subscription.is_expired) && (
                  <CTranslateTo eng="Upgrade Plan" pt="Atualizar plano" />
                )}

              {!currentSubscription && (
                <CTranslateTo eng="Subscribe Plan" pt="Assinar um plano" />
              )}
            </AuSoftUI.UI.Button>
          )}
      </BaseBox>
    </motion.div>
  );
}
