import { BaseBox } from "@/@components/(box)/BaseBox";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CardCharts() {
  return (
    <BaseBox className="p-4 flex flex-col gap-4 w-full h-50vh[]">
      <div>
        <h4 className="text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <CTranslateTo eng="Charts" pt="Gráficos" />
        </h4>
        <h4 className="text-normal text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <CTranslateTo
            eng="Your operation historic on BweviPay"
            pt="Seu histórico de operações na BweviPay"
          />
        </h4>
      </div>
      <div></div>
    </BaseBox>
  );
}
