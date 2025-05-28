import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ISubscription } from "@/http/interfaces/models/subscriptions/ISubscription";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import SubsList from "./row-list";
import SubsCard from "./card-list";
import ContainerBase from "../../cmps/ContainerBase";

export default function SubscriptionBox({
  subscriptions,
  isLoading,
}: {
  isLoading: boolean;
  subscriptions: ISubscription[];
}) {
  return (
    <ContainerBase>
      <BaseBox className={`w-full pb-5`}>
        <div className="flex md:items-center items-start md:flex-row flex-col gap-4 py-1 mb-4 px-4 justify-between border-b border-slate-200 dark:border-slate-800">
          <h4 className="md:text-lg text-base font-bold dark:text-white md:px-2 px-1 md:py-2 py-3">
            <CTranslateTo eng="Register" pt="Registos" /> (
            {subscriptions.length})
          </h4>
        </div>

        {isLoading && (
          <div className="h-[50vh] overflow-y-auto">
            <AuSoftUI.Component.LoadingList isLoading={isLoading} />
          </div>
        )}
        {subscriptions.length <= 0 && !isLoading && (
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

        {subscriptions.length > 0 && !isLoading && (
          <>
            <div className="md:flex hidden">
              <SubsList subscriptions={subscriptions} />
            </div>

            <div className={`md:hidden flex flex-col gap-4 overflow-y-auto`}>
              <SubsCard subscriptions={subscriptions} />
            </div>
          </>
        )}
      </BaseBox>
    </ContainerBase>
  );
}
