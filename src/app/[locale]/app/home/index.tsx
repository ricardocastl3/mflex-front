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
          <CardEvent />
          <CardTransactions />
          <CardTransfers />
          <CardTicket />
        </div>

        <BaseBox className="flex-1 p-8 flex-col gap-4 h-full items-center flex justify-center">
          <AAuSoftLogo size={70} />
          <h3 className="text-lg font-bold text-center dark:text-white">
            <CTranslateTo
              eng="Welcome in Flex Zone"
              pt="Bem-vindo a Flex Zone"
            />
          </h3>
          <h3>
            <CTranslateTo eng=""  pt="Aqui você pode, ver as suas assinaturas, consultas a venda"/>
          </h3>
        </BaseBox>
      </ContainerBase>
    </PageBase>
  );
}
