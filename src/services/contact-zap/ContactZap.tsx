import { langByCookies } from "@/http/axios/api";
import { ReactIcons } from "@/utils/icons";

import { usePathname } from "next/navigation";

import Link from "next/link";

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
          className="fixed  z-20 animate-fade-up"
        >
          <div className="dark:bg-orange-900 bg-orange-600 animate-pulse p-1.5 rounded-full">
            <Link
              target="_blank"
              href={`https://wa.me/244953320345?text=${
                langByCookies == "en"
                  ? "Hello, I need a help!"
                  : "Olá, preciso de ajuda!"
              }`}
              className="p-2 flex cursor-pointer hover:animate-jump hover:dark:bg-orange-700 hover:bg-orange-600 transition-all duration-300 dark:bg-orange-600 bg-orange-500 text-white rounded-full"
            >
              <ReactIcons.Io5Icon.IoLogoWhatsapp size={28} />
            </Link>
          </div>
        </div>
      );
    }
  }

  return <></>;
}
