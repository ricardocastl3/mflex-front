import { AuSoftUI } from "@/@components/(ausoft)";
import { useState } from "react";
import { internalApi } from "@/http/axios/api";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactIcons } from "@/utils/icons";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function UserDetailBox() {
  //contexts
  const { fetchUserInformations, userLogged } = useAuth();
  const { handleAddToastOnArray } = useAppProvider();

  //controls
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [personalData, setPersonalData] = useState<{
    email?: string;
    first: string;
    last: string;
    gender: string;
    birthday: string;
  }>(
    userLogged && userLogged.profile
      ? {
          last: userLogged.last_name || "",
          first: userLogged.first_name || "",
          email: userLogged.email,
          birthday: userLogged.profile?.birthday || "",
          gender: userLogged.profile?.gender || "",
        }
      : { last: "", first: "", email: "", birthday: "", gender: "" }
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userLogged?.profile?.phone_number
      ? "+244" + userLogged.profile?.phone_number
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
        email: personalData.email,
        gender: personalData.gender,
        birthday: personalData.birthday,
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
          <div className="flex items-center gap-2 dark:text-slate-100">
            <h3 className="text-md font-bold dark:text-slate-100">
              <CTranslateTo pt="Meus Dados" eng="My Informations" />
            </h3>
            <ReactIcons.AiICon.AiOutlineUser size={15} />
          </div>
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

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold dark:text-white">
              <CTranslateTo eng="Gender" pt="Género" />
            </h4>
            <AuSoftUI.UI.Select
              value={personalData.gender}
              onChange={(e) => {
                setPersonalData((state) => ({
                  ...state,
                  gender: e.target.value,
                }));
              }}
              className="w-full"
              weight={"md"}
            >
              <option
                value={""}
                className="dark:bg-ausoft-slate-950 dark:text-white"
              >
                <CTranslateTo
                  eng="--------- Select Gender -------"
                  pt="-------- Selecione o seu género ------"
                />
              </option>

              <option
                value={"masculine"}
                className="dark:bg-ausoft-slate-950 dark:text-white"
              >
                <CTranslateTo eng="Masculine" pt="Masculino" />
              </option>
              <option
                value={"feminine"}
                className="md:bg-ausoft-slate-950 dark:text-white"
              >
                <CTranslateTo eng="Feminine" pt="Feminino" />
              </option>
            </AuSoftUI.UI.Select>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold dark:text-white">
              <CTranslateTo eng="Birthday" pt="Data de nascimeno" />
            </h4>
            <AuSoftUI.UI.TextField.Default
              value={
                personalData.birthday
                  ? personalData.birthday.split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              type="date"
              onChange={(e) => {
                setPersonalData((state) => ({
                  ...state,
                  birthday: e.target.value,
                }));
              }}
              className="w-full"
              weight={"md"}
              placeholder="Ex: Castro"
            />
          </div>

          <div className="flex flex-col gap-4 relative">
            <h4 className="text-sm font-bold dark:text-white">
              <CTranslateTo eng="Mobile Phone Number" pt="Número de celular" />
            </h4>
            <AuSoftUI.UI.TextField.Phone
              disabled={true}
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold dark:text-white">
              <CTranslateTo eng="Email" pt="Email" />
            </h4>
            <AuSoftUI.UI.TextField.Default
              value={personalData.email}
              onChange={(e) => {
                setPersonalData((state) => ({
                  ...state,
                  email: e.target.value,
                }));
              }}
              className="w-full"
              weight={"md"}
              placeholder="Ex: oi@marcaflex.com"
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
          className="md:w-fit w-full items-center"
        >
          {isSubmitting && (
            <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />
          )}

          {!isSubmitting && (
            <>
              <CTranslateTo eng="Save changes" pt="Salvar alterações" />
              <ReactIcons.AiICon.AiOutlineForm size={14} />
            </>
          )}
        </AuSoftUI.UI.Button>
      </div>
    </BaseBox>
  );
}
