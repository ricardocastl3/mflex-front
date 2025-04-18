"use client";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import UserDetailBox from "./components/user-details";
import BankMerchantBox from "./components/bank-merchant";
import PageBase from "../cmps/PageBase";
import ContainerBase from "../cmps/ContainerBase";
import UserSettingsBox from "./components/user-settings";

export default function SettingsPage() {
  return (
    <PageBase>
      <div className="flex items-center border-b pb-4 border-slate-300 dark:border-slate-800">
        <h4 className="font-bold text-xl dark:text-white">
          <CTranslateTo eng="Settings" pt="Definições" />
        </h4>
      </div>
      <ContainerBase>
        <UserDetailBox />
        <UserSettingsBox />
        <BankMerchantBox />
      </ContainerBase>
    </PageBase>
  );
}
