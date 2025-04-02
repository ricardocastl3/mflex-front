import { BaseBox } from "@/@components/(box)/BaseBox";
import {
  TAngolanMethods,
  useCheckoutProvider,
} from "@/providers/app/CheckoutProvider";
import { localImages } from "@/utils/images";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

import Image from "next/image";

interface IIdentityCard {
  isSelected: boolean;
  title_pt: string;
  title_en: string;
  method: TAngolanMethods;
  isLoading: boolean;
  active?: boolean;
}

export default function PaymentCard({
  isSelected,
  isLoading,
  method,
  title_en,
  title_pt,
  active = false,
}: IIdentityCard) {
  const { handleSelectAngolanMethod } = useCheckoutProvider();

  return (
    <BaseBox
      className={`${
        isSelected && active
          ? " border-blue-600 dark:border-blue-600"
          : "border-slate-200 dark:border-slate-800 "
      } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${
        active ? "" : "cursor-not-allowed opacity-90"
      } border p-4  dark:text-white flex items-center flex-col gap-2 justify-between `}
      onClick={() => {
        if (isLoading || !active) return;
        handleSelectAngolanMethod(method);
      }}
    >
      {method == "express" && (
        <Image
          src={localImages.logos.multicaixaExpress}
          height={33}
          width={33}
          alt="ícone do multicaixa express"
          className="rounded-lg"
        />
      )}

      {method == "paypay" && (
        <Image
          src={localImages.logos.paypayLogo}
          height={33}
          width={33}
          alt="Ícone da paypay"
          className="rounded-lg"
        />
      )}

      {method == "reference" && (
        <Image
          src={localImages.logos.multicaixaReference}
          height={33}
          width={33}
          alt="ícone do multicaixa express por referência"
          className="rounded-lg"
        />
      )}

      <h4 className="text-[0.8rem] text-center font-bold flex flex-col items-center gap-4">
        <CTranslateTo pt={title_pt} eng={title_en} />
      </h4>
    </BaseBox>
  );
}
