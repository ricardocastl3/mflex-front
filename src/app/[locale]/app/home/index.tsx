"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { BaseBox } from "@/@components/(box)/BaseBox";

import PageBase from "../cmps/PageBase";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import ContainerBase from "../cmps/ContainerBase";
import CardTicket from "./components/CardTicket";
import CardEvent from "./components/CardEvent";
import CardTransactions from "./components/CardTransactions";
import CardTransfers from "./components/CardTransfers";
import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";

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

        <BaseBox className="flex-1 p-8 flex-col gap-4 h-full items-center flex justify-center">
          <AAuSoftLogo size={70} />
          <h3 className="text-lg font-bold text-center dark:text-white">
            <CTranslateTo
              eng="Flexibility & Strategy"
              pt="Flexibilidade & Estratégia"
            />
          </h3>
        </BaseBox>
      </ContainerBase>
    </PageBase>
  );
}
