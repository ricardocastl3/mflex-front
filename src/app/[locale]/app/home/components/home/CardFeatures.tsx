import { BaseBox } from "@/@components/(box)/BaseBox";
import { IHomeFeature } from "./features";
import { ReactIcons } from "@/utils/icons";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function CardHomeFeature({
  feature,
}: {
  feature: IHomeFeature;
}) {
  return (
    <Link
      href={`/${langByCookies}${feature.action_url}`}
      className="w-full h-full md:hover:scale-[1.03] scale-100 transition-all"
    >
      <BaseBox className="p-2 bg-slate-200/40 h-full">
        <div className="p-3 flex items-center gap-2 border-b pb-3 border-slate-300 dark:border-slate-800">
          <ReactIcons.AiICon.AiFillCiCircle
            size={20}
            className={`${feature.color} rounded-full`}
          />
          <h1 className="text-sm dark:text-white">
            <CTranslateTo eng={feature.t_en} pt={feature.t_pt} />
          </h1>
        </div>
        <div className="p-3">
          <h4 className="text-sm dark:text-slate-400 text-slate-600">
            <CTranslateTo eng={feature.d_en} pt={feature.d_pt} />
          </h4>
        </div>
      </BaseBox>
    </Link>
  );
}
