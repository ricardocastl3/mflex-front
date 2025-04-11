import { AuSoftUI } from "@/@components/(ausoft)";
import { useEffect, useState } from "react";
import { internalApi } from "@/http/axios/api";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function BankMerchantBox() {
  //contexts
  const { fetchUserInformations, userLogged } = useAuth();
  const { handleAddToastOnArray } = useAppProvider();

  //controls
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userIban, setUserIban] = useState("");
  const [ownerName, setOwnerName] = useState("");

  async function handleUpdatePreferences() {
    try {
      if (userIban.length < 21) {
        AuSoftUI.Component.ToastifyWithTranslation({
          description_en:
            "Please provide a valid IBAN with a maximum of 21 numbers",
          description_pt:
            "Por favor, informe um IBAN válido com 21 números no máximo",
          title_en: "Invalid IBAN",
          title_pt: "IBAN inválido",
          toast: handleAddToastOnArray,
          type: "error",
        });
        return;
      }

      setIsSubmitting(true);

      await internalApi.put("/payments/financial", {
        userIban,
        ownerName,
      });

      AuSoftUI.Component.ToastifyWithTranslation({
        description_en: "Your bank detail went updated successfully",
        description_pt: "Os seus dados bancários foram atualizados com sucesso",
        title_en: "Update your bank account details",
        title_pt: "Dados da conta bancária atualizados",
        toast: handleAddToastOnArray,
        type: "success",
      });

      await fetchUserInformations();
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  useEffect(() => {
    const account = userLogged?.financial.find((i) => i.type == "iban");
    if (account) {
      setUserIban(account.iban);
      setOwnerName(account.owner);
    }
  }, [userLogged]);

  return (
    <BaseBox className="md:px-5 px-4 md:py-4 py-4">
      <div className="flex items-start gap-2 border-b pb-2 border-slate-300/80 dark:border-slate-800">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-md font-bold dark:text-slate-100">
            <CTranslateTo pt="Conta Bancária" eng="Bank Account" />
          </h3>
          <h3 className="text-normal text-slate-500 dark:text-slate-400 md:w-[50vw] w-full">
            <CTranslateTo
              pt="Informe os dados corretamente, pois usaremos para fazer o envio do dinheiro em sua conta"
              eng="Enter the data correctly, as we will use it to send the money to your account"
            />
          </h3>
        </div>
      </div>
      <div className="mt-4 flex flex-col w-full items-start gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold dark:text-white">
              <CTranslateTo eng="Owner name" pt="Nome do titular" />
            </h4>
            <AuSoftUI.UI.TextField.Default
              value={ownerName}
              onChange={(e) => {
                setOwnerName(e.target.value.toUpperCase());
              }}
              className="w-full"
              weight={"md"}
              placeholder="Ex: Albert Einstein..."
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold dark:text-white">
              <CTranslateTo
                eng="IBAN (AO06) - No need to include (AO06)"
                pt="IBAN (AO06) - Não precisa incluir o (AO06)"
              />
            </h4>
            <AuSoftUI.UI.TextField.Default
              value={userIban}
              onChange={(e) => {
                setUserIban(e.target.value);
              }}
              className="w-full"
              weight={"md"}
              placeholder="Ex: 0040000056482548"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 border-t pt-2 border-slate-300/80 dark:border-slate-800">
        <AuSoftUI.UI.Button
          onClick={() => handleUpdatePreferences()}
          disabled={isSubmitting}
          variant={"primary"}
          size={"md"}
          className="md:w-fit w-full"
        >
          {isSubmitting && (
            <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />
          )}

          {!isSubmitting && (
            <CTranslateTo eng="Save changes" pt="Salvar alterações" />
          )}
        </AuSoftUI.UI.Button>
      </div>
    </BaseBox>
  );
}
