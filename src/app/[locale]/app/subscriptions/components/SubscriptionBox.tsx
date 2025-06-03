import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ISubscriptionResponseAPI } from "@/http/interfaces/models/subscriptions/ISubscription";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import SubsList from "./row-list";
import SubsCard from "./card-list";
import ContainerBase from "../../@components/ContainerBase";
import LoadingMoreButton from "../../@components/api-query-pages/LoadingMoreButton";

export default function SubscriptionBox({
  subscriptions,
  isLoading,
  isLoadingMore,
  fetcHasMore,
}: {
  fetcHasMore: () => void;
  isLoadingMore: boolean;
  isLoading: boolean;
  subscriptions: ISubscriptionResponseAPI;
}) {
  return (
    <ContainerBase>
      <BaseBox className={`w-full pb-5`}>
        <div className="flex md:items-center items-start md:flex-row flex-col gap-4 py-1 mb-4 px-4 justify-between border-b border-slate-200 dark:border-slate-800">
          <h4 className="md:text-lg text-base font-bold dark:text-white md:px-2 px-1 md:py-2 py-3">
            <CTranslateTo eng="Register" pt="Registos" />{" "}
            {`${
              subscriptions.has
                ? `(${subscriptions.subs.length}/${subscriptions.total})`
                : `(${subscriptions.subs.length})`
            }`}
          </h4>
        </div>

        <AuSoftUI.Component.LoadingList
          height="h-[52]"
          overflow={false}
          isLoading={isLoading}
        />

        {subscriptions.subs.length <= 0 && !isLoading && (
          <div className="md:pt-14 pt-12 md:pb-16 pb-16 py-12">
            <AuSoftUI.Component.ListEmpty
              hasAction={false}
              action_en="Create Group"
              action_pt="Criar Grupo"
              action_url="customers?create-group=true"
              description_en="All created subscriptions will be shown here"
              description_pt="Todas as assinaturas criadas serão mostradas aqui"
              title_en="No Result"
              title_pt="Nenhum Resultado"
            />
          </div>
        )}

        {subscriptions.subs.length > 0 && !isLoading && (
          <>
            <div className="md:flex hidden">
              <SubsList
                isLoadingMore={isLoadingMore}
                subscriptions={subscriptions}
              />
            </div>

            <div className={`md:hidden flex flex-col gap-4 overflow-y-auto`}>
              <SubsCard
                isLoadingMore={isLoadingMore}
                subscriptions={subscriptions}
              />
            </div>

            <LoadingMoreButton
              fetchMore={fetcHasMore}
              has={subscriptions.has}
              isLoading={isLoadingMore}
            />
          </>
        )}
      </BaseBox>
    </ContainerBase>
  );
}
