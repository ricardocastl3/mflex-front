"use client";

import { ReactIcons } from "@/utils/icons";
import { artistServices } from "./components/services";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useAppProvider } from "@/providers/app/AppProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import PageBase from "../../@components/PageBase";
import ContainerBase from "../../@components/ContainerBase";
import CardAffiliateItem from "./components/card-items";
import ArtistRequesting from "./box/ArtistRequesting";
import NoArtistProfile from "./box/NoArtistProfile";

export default function ArtistPage() {
  const { userLogged } = useAuth();
  const { affiliateConfigs } = useAppProvider();

  return (
    <>
      {userLogged?.artist_profile &&
        (userLogged.artist_profile.request_profile &&
          !userLogged.artist_profile.is_online) && <ArtistRequesting />}

      {!userLogged?.artist_profile && <NoArtistProfile />}

      {userLogged?.artist_profile && userLogged.artist_profile.is_online && (
        <>
          <PageBase>
            <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
              <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
                <ReactIcons.FaIcon.FaMusic size={18} />
                <CTranslateTo eng="Artist Dashboard" pt="Painel do artista" />
              </h4>
            </div>

            <ContainerBase>
              <div className="md:p-4 p-0.5 flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                    {artistServices
                      .filter((i) => i.type == "menu")
                      .map((service, i) => {
                        return <CardAffiliateItem service={service} key={i} />;
                      })}
                  </div>
                </div>
                {userLogged?.profile?.affiliate_active && affiliateConfigs && (
                  <div className="pt-4 flex flex-col gap-4 border-t border-slate-300 dark:border-slate-800">
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                      {artistServices
                        .filter((i) => i.type == "manual")
                        .map((service, i) => {
                          return (
                            <CardAffiliateItem service={service} key={i} />
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </ContainerBase>
          </PageBase>
        </>
      )}
    </>
  );
}
