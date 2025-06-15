import { IMusicDonationResponseAPI } from "@/http/interfaces/models/artists/IMusicDonation";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CardStatus from "./card-status";
import LoadMoreContent from "../../../@components/api-query-pages/LoadMoreContent";
import CurrencyServices from "@/services/CurrencyServices";
import MusicMiniCoverPlayer from "../../../(artist)/art-musics/components/MusicMiniCoverPlayer";
import Link from "next/link";
import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";

export default function RowDonationsTranfers({
  donationsAPI,
  isLoadingMore,
}: {
  isLoadingMore: boolean;
  donationsAPI: IMusicDonationResponseAPI;
}) {
  const donations = donationsAPI.donations;

  return (
    <div className="flex flex-col w-full px-2">
      <div className="grid grid-cols-6 w-full p-4 border-b border-slate-200 dark:border-slate-800">
        <h4 className="font-bold dark:text-white text-sm col-span-3">
          <CTranslateTo eng="Name" pt="Nome" />
        </h4>
      </div>
      <div className="w-full">
        {donations.map((prod, i) => {
          return (
            <div
              key={i}
              className="p-4 items-center  w-full cursor-pointer hover:bg-slate-100 rounded-lg dark:hover:bg-slate-700/50"
            >
              <div className="flex items-center gap-4">
                <MusicMiniCoverPlayer
                  type="mini"
                  cover={
                    prod.music?.cover ||
                    "https://img.freepik.com/free-photo/beautifully-illustrate-musical-instrument_23-2151103366.jpg?t=st=1749755983~exp=1749759583~hmac=5237a40b588b949836fe336a42f16b8f9b55fad8eec9e41c92b5e2023c85ec93&w=740"
                  }
                  url={prod.music?.url}
                />

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="text-sm dark:text-white pr-5 text-wrap">
                    {prod.music && <>{`${prod.music.title}`}</>}
                    {!prod.music && <>{`${prod.music_title}`}</>}
                  </h4>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm dark:text-white text-nowrap">
                        <b className="font-bold text-yellow-500 dark:text-yellow-400">
                          {prod.artist_profile && (
                            <>{prod.artist_profile.name}</>
                          )}
                          {!prod.artist_profile && <>{prod.artist_name}</>}
                          {" → "}
                        </b>
                      </h4>
                      <h4 className="text-sm text-green-500">
                        {`${CurrencyServices.decimal(Number(prod.amount))} Kz`}
                      </h4>
                    </div>

                    {prod.music && (
                      <Link
                        target="_blank"
                        href={`/${langByCookies}/musics/${prod.music.slug}`}
                        className="h-fit w-fit text-xs gap-1 px-2 py-0.5 rounded-xl hover:bg-slate-300 hover:dark:bg-slate-900 bg-slate-200 dark:bg-slate-800/40 dark:text-slate-400 text-slate-800 flex items-center"
                      >
                        <ReactIcons.HiIcon.HiLink size={18} />
                        <CTranslateTo eng="Open music" pt="Visualizar música" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <LoadMoreContent isLoading={isLoadingMore} />
      </div>
    </div>
  );
}
