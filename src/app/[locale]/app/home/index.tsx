"use client";

import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";

import PageBase from "../cmps/PageBase";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function Home() {
  const { openBanner } = useAppProvider();
  const { userLogged } = useAuth();
  return (
    <PageBase>
      <h1 className="text-xl font-bold dark:text-white">
        <CTranslateTo eng="Hello, " pt="Olá," /> {userLogged?.first_name} 👏
      </h1>
    </PageBase>
  );
}
