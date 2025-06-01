"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { homeFeatures } from "./components/home/features";

import PageBase from "../@components/PageBase";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import ContainerBase from "../@components/ContainerBase";
import CardTicket from "./components/CardTicket";
import CardEvent from "./components/CardEvent";
import CardTransactions from "./components/CardTransactions";
import CardTransfers from "./components/CardTransfers";
import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import CardHomeFeature from "./components/home/CardFeatures";

export default function Home() {
  const { userLogged } = useAuth();
  return (
    <PageBase>
      <div>
        <h1 className="text-xl font-bold dark:text-white">
          <CTranslateTo eng="Hello, " pt="Olá," /> {userLogged?.first_name} 👏
        </h1>
      </div>
      <ContainerBase>
        <div className="grid md:grid-cols-4 grid-cols-1m gap-4">
          <CardTicket />
          <CardEvent />
          <CardTransactions />
          <CardTransfers />
        </div>

        <BaseBox className="flex-1 md:px-8 px-2.5 md:py-8 py-5 flex-col gap-4">
          <div className="flex flex-col gap-3 items-center justify-center pb-6">
            <AAuSoftLogo size={50} />
            <h3 className="text-lg font-bold text-center dark:text-white">
              <CTranslateTo
                eng="Welcome in Flex Zone"
                pt="Bem-vindo a Flex Zone"
              />
            </h3>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {homeFeatures.map((feat, i) => {
              return <CardHomeFeature key={i} feature={feat} />;
            })}
          </div>
        </BaseBox>
      </ContainerBase>
    </PageBase>
  );
}
