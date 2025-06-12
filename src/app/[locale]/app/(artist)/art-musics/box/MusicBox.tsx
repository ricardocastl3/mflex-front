import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { IMusicResponseAPI } from "@/http/interfaces/models/artists/IMusic";

import LoadingMoreButton from "../../../@components/api-query-pages/LoadingMoreButton";
import RowMusic from "./row-music";
import CardMusic from "./card-music";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function MusicBox({
  musicsAPI,
  isLoading,
  fetchMore,
  isLoadingMore,
}: {
  fetchMore: () => void;
  isLoading: boolean;
  isLoadingMore: boolean;
  musicsAPI: IMusicResponseAPI;
}) {
  const musics = musicsAPI.musics;

  return (
    <BaseBox className={`w-full pb-5`}>
      <div className="flex md:items-center items-start md:flex-row flex-col gap-4 py-1 mb-4 px-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <h4 className="md:text-lg text-base font-bold dark:text-white md:px-2 px-1 md:py-2 py-3">
          <CTranslateTo eng="Total" pt="Total" />
          {`${
            musicsAPI.has
              ? ` (${musicsAPI.musics.length}/${musicsAPI.total})`
              : ` (${musicsAPI.musics.length})`
          }`}
        </h4>
      </div>

      <AuSoftUI.Component.LoadingList
        overflow={false}
        height="h-[52vh]"
        isLoading={isLoading}
      />

      {musics.length <= 0 && !isLoading && (
        <div className="md:pt-14 pt-12 md:pb-16 pb-16 py-12">
          <AuSoftUI.Component.ListEmpty
            hasAction={false}
            action_en="Create Group"
            action_pt="Criar Grupo"
            action_url="customers?create-group=true"
            description_en="All created transfers will be shown here"
            description_pt="Todas as transferências criadas serão mostradas aqui"
            title_en="No Result"
            title_pt="Nenhum Resultado"
          />
        </div>
      )}

      {musics.length > 0 && !isLoading && (
        <>
          <div className="md:flex hidden">
            <RowMusic isLoadingMore={isLoadingMore} musicsAPI={musicsAPI} />
          </div>

          <div className={`md:hidden flex flex-col gap-4 overflow-y-auto`}>
            <CardMusic isLoadingMore={isLoadingMore} musicsAPI={musicsAPI} />
          </div>

          <LoadingMoreButton
            fetchMore={fetchMore}
            has={musicsAPI.has}
            isLoading={isLoadingMore}
          />
        </>
      )}
    </BaseBox>
  );
}
