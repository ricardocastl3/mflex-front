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
          ? " border-yellow-600 dark:border-yellow-600"
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

      <h4 className="text-sm text-center font-bold flex flex-col items-center gap-4">
        <CTranslateTo pt={title_pt} eng={title_en} />
        {method == "paypay" && (
          <b className="text-yellow">
            <CTranslateTo eng="3% discount" pt="3% disconto" />
          </b>
        )}
      </h4>

      {active && (
        <h4 className="text-green-950 bg-green-100 dark:bg-green-900/20 dark:text-green-300 py-1 px-2 text-xs font-bold rounded-xl ">
          <CTranslateTo eng="Available" pt="Disponível" />
        </h4>
      )}

      {!active && (
        <h4 className="text-red-950 bg-red-100 dark:bg-red-900/20 dark:text-red-300 py-1 px-2 text-xs font-bold rounded-xl ">
          <CTranslateTo eng="Unavailable" pt="Indisponível" />
        </h4>
      )}
    </BaseBox>
  );
}
