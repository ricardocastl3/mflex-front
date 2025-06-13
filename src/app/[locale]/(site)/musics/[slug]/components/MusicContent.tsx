import { BaseBox } from "@/@components/(box)/BaseBox";
import { IMusic } from "@/http/interfaces/models/artists/IMusic";
import { amountToDonate } from "./services";
import { useCheckoutProvider } from "@/providers/app/CheckoutProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useMusicProvider } from "@/providers/features/MusicProvider";
import { useEffect, useState } from "react";

import DateCategory from "../../../components/DateCategory";
import MusicArtistProfile from "./MusicArtistProfile";
import MusicPlayer from "./MusicPlayer";
import CurrencyServices from "@/services/CurrencyServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";
import Link from "next/link";
import MusicViews from "@/app/[locale]/app/(artist)/art-musics/components/MusicViews";

export default function MusicContent({ music }: { music: IMusic }) {
  const { userLogged } = useAuth();
  const { handleAddItemOnCheckout } = useCheckoutProvider();
  const { isPlayingMusic, handleIsPlayingMusic, handleSelectMusic } =
    useMusicProvider();
  const { handleOpenModal } = useModal();
  const { serverStats } = useAppProvider();

  const [checkUser, setCheckUser] = useState(false);

  useEffect(() => {
    let timeoutUser: NodeJS.Timeout;
    let timeoutView: NodeJS.Timeout;

    if (checkUser) {
      timeoutUser = setTimeout(async () => {
        if (!userLogged) {
          handleSelectMusic(music);
          handleIsPlayingMusic(false);
          handleOpenModal("ads-listen-music");
        } else {
          await internalApi.post("/artists/musics/v", {
            m: music.id,
          });
        }
      }, 30000);

      timeoutView = setTimeout(async () => {
        if (!userLogged) return;
        await internalApi.post("/artists/musics/v", {
          m: music.id,
        });
      }, 10000);
    }

    return () => {
      if (timeoutUser) {
        clearTimeout(timeoutUser);
      }
      if (timeoutView) {
        clearTimeout(timeoutView);
      }
    };
  }, [checkUser, userLogged, handleOpenModal]);

  useEffect(() => {
    if (isPlayingMusic) setCheckUser(isPlayingMusic);
  }, [isPlayingMusic]);

  return (
    <BaseBox className="flex-1 md:p-8 p-0 md:mb-8 mb-0 md:rounded-xl rounded-none flex flex-col md:gap-4 gap-0 dark:bg-ausoft-slate-900 ">
      <div className="md:flex hidden">
        <MusicArtistProfile artist={music.artist_profile!} />
      </div>
      <MusicPlayer music={music} />

      <div className="flex flex-col gap-4 md:p-0 p-4">
        <div className="md:hidden flex flex-col gap-3">
          <h4 className="text-[1.7rems] dark:text-white font-bold">
            {music.title}
          </h4>
          <MusicArtistProfile artist={music.artist_profile!} />
        </div>

        <div className="flex items-center gap-3 flex-wrap border-b pb-4 border-slate-300 dark:border-slate-700/60">
          <DateCategory
            right
            category_name={music?.category ? music.category.name : "no"}
            date={music.created_at}
          />
          <MusicViews views={music.views_count.length} />
        </div>
        {music.artist_profile?.is_verified &&
          serverStats &&
          serverStats?.music_donation_on && (
            <div className="flex flex-col gap-2">
              <h1 className="dark:text-white">
                <CTranslateTo
                  eng="Did you like the song? Make a donation to the artist:"
                  pt="Gostou da música? Faça uma doação para o artista:"
                />
              </h1>

              {!userLogged && (
                <Link href={`/${langByCookies}/sign-in`}>
                  <AuSoftUI.UI.Button
                    onClick={() => {
                      LocalStorageServices.setMusicSlug(music.slug);
                    }}
                    size={"sm"}
                    variant={"primary"}
                    className="items-center w-fit"
                  >
                    <CTranslateTo
                      eng="Log in or create an account to donate"
                      pt="Inicie sessão ou crie uma conta para doar"
                    />
                    <ReactIcons.FaIcon.FaDonate size={12} />
                  </AuSoftUI.UI.Button>
                </Link>
              )}

              {userLogged && (
                <div className="flex items-center flex-wrap gap-2">
                  {amountToDonate.map((don, i) => {
                    return (
                      <div
                        onClick={() => {
                          handleAddItemOnCheckout({
                            amount: don.amount,
                            price: music.id,
                            type: "donations",
                            monthly: "no",
                          });
                          handleOpenModal("angolan-payment-modal");
                        }}
                        key={i}
                        className="border border-slate-200 dark:border-slate-700 cursor-pointer dark:bg-slate-800/50 bg-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800 p-2 text-base rounded-xl text-slate-800 dark:text-slate-100 font-bold"
                      >
                        {CurrencyServices.decimal(don.amount) + " Kz"}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
      </div>
    </BaseBox>
  );
}
