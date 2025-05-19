import { BaseBox } from "@/@components/(box)/BaseBox";
import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { ITVMovieSafed } from "@/http/interfaces/models/tv/ITVMovie";
import { langByCookies } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";
import { motion } from "framer-motion";

import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

export default function TVItem({
  item,
  index,
}: {
  item: ITVMovieSafed;
  index: number;
}) {
  const { handleSelectFlexTV } = useFlexTVProvider();
  const { handleOpenModal } = useModal();
  const { currentSubscription } = useAuth();

  function handleSubscribe() {
    LocalStorageServices.resetAllKeys();
    LocalStorageServices.setKey(
      LocalStorageServices.keys.watchTv,
      `wt_${new Date().getTime()}`
    );

    window.location.href = `/${langByCookies}/pricing`;
  }

  return (
    <>
      <motion.div
        initial={{ y: "9rem", opacity: 0 }}
        animate={{ y: "0rem", opacity: 1 }}
        transition={{ type: "spring", delay: 0.3 * index, duration: 2 }}
        className="cursor-pointer w-full "
      >
        <div className="flex flex-col gap-4 dark:p-0 p-2 md:hover:scale-[1.03] scale-100 transition-all bg-white dark:bg-transparent rounded-2xl">
          <BaseBox
            style={{
              height: "300px",
              width: window.innerWidth < 765 ? "100%" : "100%",
              objectFit: "cover",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${item.logo})`,
              backgroundRepeat: "no-repeat",
            }}
            className="flex flex-col gap-2  justify-between"
          ></BaseBox>
          <div className="flex flex-col gap-2 dark:px-0 px-2 dark:pb-0 pb-4">
            <h4 className="font-bold text-base dark:text-white">
              {item.name.replace("PT|", "").replace("BR|", "")}
            </h4>
          </div>
        </div>
      </motion.div>
    </>
  );
}
