import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { localImages } from "@/utils/images";

import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import Link from "next/link";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import AAnimated from "@/@components/(ausoft)/AAnimated";

export default function SocialItem({
  action,
  social,
  des_pt,
  des_en,
  brand_color,
}: {
  social: "tiktok" | "facebook" | "instagram";
  action: string;
  des_en: string;
  des_pt: string;
  brand_color?: string;
}) {
  return (
    <AAnimated animate="animate-fade w-full">
      <Link
        target="_blank"
        href={action}
        className="w-full md:hover:scale-[1.03] hover:scale-100 scale-100 transition-all"
      >
        <BaseBox className="relative rounded-2xl">
          <div
            style={{
              objectFit: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundImage: `url(${localImages.banner.flexSocial})`,
            }}
            className="md:h-[20vh] h-[13vh] w-full rounded-t-2xl relative"
          >
            <div className="absolute -bottom-7 md:left-6 left-6 w-fit p-0.5 bg-yellow-600 rounded-full">
              <div className="w-[70px] h-[70px] flex justify-center items-center rounded-full bg-black">
                <AAuSoftLogo size={60} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:px-6 px-6 pb-3">
            <div className="flex items-center gap-2">
              <h4 className="text-lg dark:text-white font-bold">Marca Flex</h4>
              <div
                className={`${
                  social == "tiktok"
                    ? "dark:text-white"
                    : social == "instagram"
                    ? "text-violet-500"
                    : "text-blue-500"
                }`}
              >
                {social == "tiktok" && (
                  <ReactIcons.AiICon.AiFillTikTok size={18} />
                )}
                {social == "instagram" && (
                  <ReactIcons.AiICon.AiFillInstagram size={18} />
                )}
                {social == "facebook" && (
                  <ReactIcons.MdIcon.MdFacebook size={18} />
                )}
              </div>
              <h1
                className={`${
                  brand_color
                    ? brand_color
                    : "text-yellow-700 dark:text-yellow-400"
                } text-base`}
              >
                @marcafl3x
              </h1>
            </div>
            <h3 className="mt-0.5 text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <CTranslateTo eng={des_en} pt={des_pt} />
            </h3>
          </div>
        </BaseBox>
      </Link>
    </AAnimated>
  );
}
