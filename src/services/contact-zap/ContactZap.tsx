import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";
import { usePathname } from "next/navigation";

import Link from "next/link";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function ContactZap() {
  const path = usePathname();

  let bottomSafe = "";
  let rightSafe = "";

  if (typeof window != "undefined") {
    if (window.innerWidth >= 768) {
      bottomSafe = "3.5rem";
      rightSafe = "2rem";
    } else {
      bottomSafe = "5.5rem";
      rightSafe = "1.5rem";
    }

    if (!path.startsWith("/en/app") && !path.startsWith("/pt/app")) {
      return (
        <div
          style={{
            bottom: bottomSafe,
            right: rightSafe,
          }}
          className="fixed z-20 animate-fade-up"
        >
          <div className="dark:bg-yellow-800 bg-yellow-300 px-1 py-[0.1rem] rounded-full">
            <Link
              target="_blank"
              href={`https://wa.me/244954974069?text=${
                langByCookies == "en"
                  ? "Hello, I need a help!"
                  : "Olá, preciso de ajuda!"
              }`}
              className="p-1.5 bg-yellow-600  flex items-center gap-4"
            >
              <h4 className="text-sm text-white">
                <CTranslateTo eng="Talk with us" pt="Fale conosco" />
              </h4>
              <div className="md:p-2 p-1 flex cursor-pointer hover:animate-jump hover:dark:bg-yellow-700 hover:bg-yellow-600 transition-all duration-300 dark:bg-yellow-600 bg-yellow-500 text-white rounded-full">
                <ReactIcons.Io5Icon.IoLogoWhatsapp size={28} />
              </div>
            </Link>
          </div>
        </div>
      );
    }
  }

  return <></>;
}
