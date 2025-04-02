import { AuSoftUI } from "@/@components/(ausoft)";
import { useState } from "react";
import { internalApi } from "@/http/axios/api";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function UserDetailBox() {
  //contexts
  const { fetchUserInformations, userLogged } = useAuth();
  const { handleAddToastOnArray } = useAppProvider();

  //controls
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [personalData, setPersonalData] = useState<{
    first: string;
    last: string;
  }>(
    userLogged
      ? { last: userLogged.last_name!, first: userLogged.first_name! }
      : { last: "", first: "" }
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userLogged?.profile?.phone_number
      ? userLogged.profile?.phone_number
      : "+244"
  );

  async function handleUpdatePreferences() {
    try {
      if (personalData.last.length <= 2) {
        AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Enter the last name",
          description_pt: "Informe o seu último nome",
          title_en: "Invalid Last Name",
          title_pt: "Último nome inválido",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }
      if (personalData.first.length <= 2) {
        AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Enter the first name",
          description_pt: "Informe o seu primeiro nome",
          title_en: "Invalid First Name",
          title_pt: "Primeiro nome inválido",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsSubmitting(true);

      await internalApi.put("/users", {
        last_name: personalData.last,
        first_name: personalData.first,
        phone: phoneNumber,
      });
      AuSoftUI.Component.ToastifyWithTranslation({
        description_en: "Your personal informations went updated successfully",
        description_pt: "Os seus dados pessoas foram atualizados com sucesso",
        title_en: "Update your personal informations",
        title_pt: "Dados pessoais atualizados",
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

  return (
    <BaseBox className="md:px-5 px-4 md:py-4 py-4">
      <div className="flex items-start gap-2 border-b pb-2 border-slate-300/80 dark:border-slate-800">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-md font-bold dark:text-slate-100">
            <CTranslateTo pt="Meus Dados" eng="My Informations" />
          </h3>
          <h3 className="text-normal text-slate-500 dark:text-slate-400 md:w-[50vw] w-full">
            <CTranslateTo
              pt="Edite suas configurações pessoais"
              eng="Update your personal informations"
            />
          </h3>
        </div>
      </div>
      <div className="mt-4 flex flex-col w-full items-start gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold dark:text-white">
              <CTranslateTo eng="First Name" pt="Primeiro Nome" />
            </h4>
            <AuSoftUI.UI.TextField.Default
              value={personalData.first}
              onChange={(e) => {
                setPersonalData((state) => ({
                  ...state,
                  first: e.target.value,
                }));
              }}
              className="w-full"
              weight={"md"}
              placeholder="Ex: Albert"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold dark:text-white">
              <CTranslateTo eng="Last name" pt="Último nome" />
            </h4>
            <AuSoftUI.UI.TextField.Default
              value={personalData.last}
              onChange={(e) => {
                setPersonalData((state) => ({
                  ...state,
                  last: e.target.value,
                }));
              }}
              className="w-full"
              weight={"md"}
              placeholder="Ex: Castro"
            />
          </div>
          <div className="flex flex-col gap-4 relative">
            <h4 className="text-sm font-bold dark:text-white">
              <CTranslateTo
                eng="WhatsApp Customer Support"
                pt="WhatsApp do Suporte Ao Cliente"
              />
            </h4>
            <AuSoftUI.UI.TextField.Phone
              value={phoneNumber}
              setValue={setPhoneNumber}
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
