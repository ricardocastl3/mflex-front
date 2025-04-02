import { BaseBox } from "@/@components/(box)/BaseBox";
import { useModal } from "@/providers/app/ModalProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { localImages } from "@/utils/images";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useState } from "react";

import BaseModal from "../../base";
import Image from "next/image";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function FirstAccessOnBoarding() {
  // Contexts
  const { handleOnboardingType } = useModal();
  const { userLogged } = useAuth();

  // Controls
  const [currentStep, setCurrentStep] = useState(0);
  const [doneOnboarding, setDoneOnboarding] = useState(false);

  function handleCloseBox() {
    handleOnboardingType({ isFirstAcess: false });
    localStorage.setItem("onboarding-first-access", "false");
  }

  return (
    <BaseModal callbackClose={() => handleCloseBox()}>
      <BaseBox className="md:w-[60vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-8 py-5 flex flex-col items-center gap-2">
          <Image
            src={localImages.logos.lora}
            width={80}
            height={80}
            alt="homem procurando papel"
          />
          <div className="md:w-[40vw] w-[70vw]">
            <AuSoftUI.Component.Step
              current={currentStep}
              total={4}
              done={doneOnboarding}
            />
          </div>

          <h4 className="font-bold text-lg text-violet-600 text-center dark:text-violet-400 mt-4">
            <CTranslateTo
              eng={``}
              pt={`Seja muito bem-vindo(a), ${userLogged?.first_name} 😃`}
            />
          </h4>
          <h4 className="flex md:flex-row flex-col text-center items-center gap-2 text-normal dark:text-slate-400 text-slate-800">
            <CTranslateTo
              eng={``}
              pt={`Daqui é a Lora, primeiramente quero deixar os meus parabéns por teres chegado até aqui, vou ajudá-lo a entender melhor como você pode tirar o máximo proveito dos meus recursos 😃`}
            />
          </h4>
        </div>
        <AuSoftUI.Component.Separator
          title_eng={`Step ${currentStep} - ${4}`}
          title_pt={`Passo ${currentStep} - ${4}`}
        />
        <div className="md:py-4 py-4 md:px-8 px-4 flex md:flex-row flex-col-reverse items-center md:gap-4 gap-2">
          {currentStep > 0 && currentStep <= 3 && (
            <AuSoftUI.UI.Button
              type="button"
              onClick={() => setCurrentStep((state) => state - 1)}
              size={"md"}
              variant={"outline"}
              className="w-full justify-center py-4 font-bold gap-2.5 text-nowrap items-center text-[0.79rem] rounded-full"
            >
              <CTranslateTo eng="Previous" pt="Anterior" />
            </AuSoftUI.UI.Button>
          )}
          {currentStep >= 0 && currentStep <= 3 && !doneOnboarding && (
            <AuSoftUI.UI.Button
              type="button"
              onClick={() =>
                setCurrentStep((state) => {
                  if (state <= 3) {
                    return state + 1;
                  }
                  return 3;
                })
              }
              size={"md"}
              variant={"primary"}
              className="w-full justify-center py-4 font-bold gap-2.5 text-nowrap items-center text-[0.79rem] rounded-full"
            >
              <CTranslateTo eng="Next" pt="Próximo" />
            </AuSoftUI.UI.Button>
          )}

          {currentStep >= 4 && (
            <AuSoftUI.UI.Button
              type="button"
              onClick={() => handleCloseBox()}
              size={"md"}
              variant={"primary"}
              className="w-full justify-center py-4 font-bold gap-2.5 text-nowrap items-center text-[0.79rem] rounded-full"
            >
              <CTranslateTo eng="Undersatnd, Lora" pt="Entendido, Lora" />
            </AuSoftUI.UI.Button>
          )}
        </div>
      </BaseBox>
    </BaseModal>
  );
}
