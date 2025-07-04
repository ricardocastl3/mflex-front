import { langByCookies } from "@/http/axios/api";
import { useModal } from "@/providers/app/ModalProvider";
import { ReactIcons } from "@/utils/icons";
import { usePathname } from "next/navigation";

export default function TechSupport() {
  const path = usePathname();
  const { handleOpenModal } = useModal();

  let bottomSafe = "";
  let rightSafe = "";

  if (typeof window != "undefined") {
    if (window.innerWidth >= 768) {
      bottomSafe = "3.5rem";
      rightSafe = "2rem";
    } else {
      bottomSafe = "4.8rem";
      rightSafe = "4rem";
    }

    if (
      !path.startsWith("/en/app") &&
      !path.startsWith("/pt/app") &&
      !path.startsWith("/pt/games") &&
      !path.startsWith("/en/games") &&
      !path.startsWith("/pt/flex-tv") &&
      !path.startsWith("/en/flex-tv") &&
      !path.startsWith("/pt/flex-movie") &&
      !path.startsWith("/en/flex-movie")
    ) {
      return (
        <div
          style={{
            bottom: bottomSafe,
            right: rightSafe,
          }}
          className="fixed  z-10 animate-fade-up"
        >
          <div className="dark:bg-orange-900 bg-orange-600 rounded-full">
            <button
              onClick={() =>
                //handleOpenModal("technical-support")
                window.open(
                  `https://wa.me/244954974069?text=${
                    langByCookies == "en"
                      ? "Hello, I need a help!"
                      : "Olá, preciso de ajuda!"
                  }`
                )
              }
              className="p-3.5 flex cursor-pointer hover:animate-jump hover:dark:bg-orange-700 hover:bg-orange-600 transition-all duration-300 dark:bg-orange-600 bg-orange-500 text-white rounded-full"
            >
              <ReactIcons.AiICon.AiFillMessage
                size={window.innerWidth > 765 ? 27 : 18}
              />
            </button>
          </div>
        </div>
      );
    }
  }

  return <></>;
}
