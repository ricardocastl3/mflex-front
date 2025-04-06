import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { IPayment } from "@/http/interfaces/models/IPayment";
import { useModal } from "@/providers/app/ModalProvider";
import { useTransactionProvider } from "@/providers/features/TransactionProvider";
import { ReactIcons } from "@/utils/icons";

export default function CardMethod({
  method,
  status,
  transaction,
}: {
  method: string;
  status?: string;
  transaction?: IPayment;
}) {
  const { handleSelectTransaction } = useTransactionProvider();
  const { handleOpenModal } = useModal();
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
      {method == "transference" && (
        <>
          <div
            onClick={() => {
              handleSelectTransaction(transaction);
              handleOpenModal("change-transaction-status");
            }}
            className={`${
              status == "pending"
                ? "dark:text-yellow-400 text-yellow-700 animate-pulse"
                : status == "success"
                ? "dark:text-cyan-400 text-cyan-700"
                : "dark:text-red-400 text-red-700"
            } flex items-center gap-2 cursor-pointer`}
          >
            <span
              className={`text-xl mb-1 w-5 h-5 flex items-center justify-center rounded-full `}
            >
              <ReactIcons.BiIcon.BiWallet />
            </span>
            <h3 className="text-sm">
              <CTranslateTo pt={"Tranfer. Bancária"} eng={"Bank Transfer "} />
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
