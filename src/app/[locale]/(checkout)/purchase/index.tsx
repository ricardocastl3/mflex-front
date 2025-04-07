"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function Purchase() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <BaseBox className="md:px-8 px-4 md:py-16 py-8 md:w-[50vw] w-[90vw]">
        <div className="flex flex-col gap-5 items-center text-center">
          <div className="rounded-full p-4 bg-green-200 dark:bg-green-700/50 text-green-600 dark:text-green-400">
            <ReactIcons.PiIcon.PiCheck size={25} />
          </div>
          <h4 className="text-xl font-bold text-blue-500">
            <CTranslateTo
              eng="Thanks for purchase!"
              pt="Obrigado por comprar!"
            />
          </h4>
          <h4 className="text-slate-600 dark:text-slate-500">
            <CTranslateTo
              eng="After making the payment, your merchant will be notified and will then release the product to you 🙌"
              pt="Após realizar o pagamento, o seu comerciante será notificado e em seguida irá liberar o produto para você 🙌"
            />
          </h4>
          <Link href={`/${langByCookies}`}>
            <AuSoftUI.UI.Button
              variant={"primary"}
              size={"md"}
              className="rounded-full"
            >
              <CTranslateTo eng="Know BweviPay" pt="Conhecer a BweviPay" />
            </AuSoftUI.UI.Button>
          </Link>
        </div>
      </BaseBox>
    </div>
  );
}
