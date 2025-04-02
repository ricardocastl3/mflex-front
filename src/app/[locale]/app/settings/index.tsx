"use client";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import UserDetailBox from "./components/user-details";
import BankMerchantBox from "./components/bank-merchant";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center border-b pb-4 border-slate-300 dark:border-slate-800">
        <h4 className="font-bold text-xl dark:text-white">
          <CTranslateTo eng="Settings" pt="Definições" />
        </h4>
      </div>
      <div className="flex flex-col gap-4 h-[70vh] overflow-y-auto md:pb-4 pb-8">
        <UserDetailBox />
        <BankMerchantBox />
      </div>
    </div>
  );
}
