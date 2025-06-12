import { useModal } from "@/providers/app/ModalProvider";
import { useTransactionProvider } from "@/providers/features/TransactionProvider";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CardMethod({ method }: { method: string }) {
  return (
    <>
      {method == "multicaixa" && (
        <>
          <div className="flex items-center gap-2">
            <span className="text-xl mb-1 dark:text-orange-400 text-orange-700 w-5 h-5 flex items-center justify-center rounded-full ">
              <ReactIcons.BiIcon.BiWallet className={"rotate-180"} />
            </span>
            <h3 className="text-sm  dark:text-orange-400 text-orange-700">
              <CTranslateTo pt={"App. Multicaixa"} eng={"App. Multicaixa"} />
            </h3>
          </div>
        </>
      )}

      {method == "reference" && (
        <>
          <div className="flex items-center gap-2">
            <span className="text-xl mb-1 dark:text-violet-400 text-violet-700 w-5 h-5 flex items-center justify-center rounded-full ">
              <ReactIcons.BiIcon.BiWallet />
            </span>
            <h3 className="text-sm dark:text-violet-400 text-violet-700">
              <CTranslateTo pt={"Referência"} eng={"Reference"} />
            </h3>
          </div>
        </>
      )}

      {method == "paypay" && (
        <>
          <div className="flex items-center gap-2">
            <span className="text-xl mb-1 dark:text-blue-400 text-blue-700 w-5 h-5 flex items-center justify-center rounded-full ">
              <ReactIcons.BiIcon.BiWallet />
            </span>
            <h3 className="text-sm dark:text-blue-400 text-blue-700">
              <CTranslateTo pt={"PayPay"} eng={"PayPay"} />
            </h3>
          </div>
        </>
      )}

      {method == "stripe" && (
        <>
          <div className="flex items-center gap-2">
            <span className="text-xl mb-1 dark:text-violet-400 text-violet-700 w-5 h-5 flex items-center justify-center rounded-full ">
              <ReactIcons.BiIcon.BiWallet />
            </span>
            <h3 className="text-sm dark:text-blue-400 text-blue-700">
              <CTranslateTo pt={"Internacional"} eng={"Internacional"} />
            </h3>
          </div>
        </>
      )}
    </>
  );
}
