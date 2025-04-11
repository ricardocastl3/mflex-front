import { localImages } from "@/utils/images";
import { AuSoftUI } from "..";
import { useAppProvider } from "@/providers/app/AppProvider";

import Image from "next/image";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

interface IAListEmpty {
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  action_url: string;
  action_blank?: boolean;
  action_pt: string;
  action_en: string;
  hasAction?: boolean;
}

export default function AListEmpty({
  action_en,
  action_pt,
  action_url,
  action_blank = false,
  description_en,
  description_pt,
  title_en,
  title_pt,
  hasAction = true,
}: IAListEmpty) {
  const { segmentedLayout, currentPageByUrl } = useAppProvider();

  return (
    <div className="flex items-center flex-col gap-3 justify-center">
      <Image
        width={100}
        height={100}
        src={localImages.vectors.emptyBox}
        alt="Imagem de lista não encontrado"
      />

      <div className="md:w-[40vw] w-[80vw] flex flex-col gap-2">
        <h4 className="text-lg text-center font-bold text-yellow-700 dark:text-yellow-400">
          <CTranslateTo eng={title_en} pt={title_pt} />
        </h4>
        <h4 className="text-base text-center text-slate-600 dark:text-slate-400">
          <CTranslateTo eng={description_en} pt={description_pt} />
        </h4>
      </div>
      {hasAction && (
        <AuSoftUI.UI.Button variant={"primary"}>
          <Link
            target={action_blank ? "_blank" : "_self"}
            href={`${
              !action_blank
                ? `/${segmentedLayout}/${
                    currentPageByUrl == "app" ? `app/${action_url}` : action_url
                  }`
                : action_url
            }`}
          >
            <CTranslateTo eng={action_en} pt={action_pt} />
          </Link>
        </AuSoftUI.UI.Button>
      )}
    </div>
  );
}
