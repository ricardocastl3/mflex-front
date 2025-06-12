import { IMusicDonationResponseAPI } from "@/http/interfaces/models/artists/IMusicDonation";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CurrencyServices from "@/services/CurrencyServices";
import LoadMoreContent from "../../@components/api-query-pages/LoadMoreContent";
import MusicMiniCoverPlayer from "../../(artist)/art-musics/components/MusicMiniCoverPlayer";

export default function CardDonationsTransfers({
  donationsAPI,
  isLoadingMore,
}: {
  isLoadingMore: boolean;
  donationsAPI: IMusicDonationResponseAPI;
}) {
  const transfers = donationsAPI.donations;

  return (
    <div className="flex flex-col w-full h-full px-1">
      {transfers.map((prod, i) => {
        return (
          <div
            key={i}
            className="p-4 flex items-start gap-3 border-b pb-2 border-slate-300 dark:border-slate-700/50"
          >
            <MusicMiniCoverPlayer
              type="mini"
              cover={
                prod.music?.cover ||
                "https://img.freepik.com/free-photo/beautifully-illustrate-musical-instrument_23-2151103366.jpg?t=st=1749755983~exp=1749759583~hmac=5237a40b588b949836fe336a42f16b8f9b55fad8eec9e41c92b5e2023c85ec93&w=740"
              }
              url={prod.music?.url}
            />
            <div className="flex-1 flex flex-col gap-0.5">
              <h4 className="dark:text-white md:text-sm text-[0.9rem] font-bold">
                <b className="font-bold text-yellow-500 dark:text-yellow-400">
                  {prod.music && <>{`${prod.music.title}`}</>}
                  {!prod.music && <>{`${prod.music_title}`}</>}
                </b>
              </h4>

              <div className="grid grid-cols-2 gap-1">
                <h4 className="dark:text-white text-sm">
                  <CTranslateTo eng="Sent Money" pt="Montante Enviado" />
                </h4>

                <h4 className="text-sm text-green-500">
                  {`${CurrencyServices.decimal(Number(prod.amount))} Kz`}
                </h4>
              </div>
            </div>
          </div>
        );
      })}

      <LoadMoreContent isLoading={isLoadingMore} />
    </div>
  );
}
