import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";
import { useRouter } from "next/navigation";
import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useAppProvider } from "@/providers/app/AppProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import WebPushServices from "@/services/web-push/WebPushServices";

export default function SubscribeBanner({
  desc_en,
  desc_pt,
  title_en,
  title_pt,
}: {
  title_pt: string;
  title_en: string;
  desc_en: string;
  desc_pt: string;
}) {
  const { userLogged } = useAuth();
  const { isNotifyGranted } = useAppProvider();
  const router = useRouter();

  async function handleSubscribe() {
    if (userLogged) {
      LocalStorageServices.setSubscriber();
      await WebPushServices.register();
      setTimeout(() => {
        window.location.reload();
      }, 400);
    } else {
      LocalStorageServices.setRedirectSubscriber();
      router.push(`/${langByCookies}/sign-up`);
    }
  }

  if (
    !LocalStorageServices.hasSubscriber() ||
    (LocalStorageServices.hasSubscriber() && !isNotifyGranted)
  )
    return (
      <div
        style={{
          backgroundImage: `url(${localImages.banner.flex2})`,
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundPosition: "center",
        }}
        className="w-full p-8 cursor-pointer  rounded-xl transition-all md:hover:scale-[1.03] hover:scale-100"
      >
        <div className="p-5 rounded-lg text-center flex flex-col items-center gap-2">
          <ReactIcons.CgIcon.CgNotifications
            size={30}
            className="text-white animate-spin"
          />
          <h1 className="text-base text-white font-bold">
            <CTranslateTo eng={title_en} pt={title_pt} />
          </h1>
          <h1 className="text-sm text-yellow-300 font-bold">
            <CTranslateTo eng={desc_en} pt={desc_pt} />
          </h1>
          <AuSoftUI.UI.Button
            onClick={handleSubscribe}
            variant={"primary"}
            className="rounded-full animate-pulse"
          >
            <CTranslateTo eng="Subscribe Me 🚀" pt="Me Inscrever 🚀" />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    );
}
