import { AuSoftUI } from "@/@components/(ausoft)";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function UpgradeSectionAffiliate() {
  return (
    <section
      style={{
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${"https://img.freepik.com/free-vector/gradient-colored-background-with-geometrical-shapes_23-2149112196.jpg?t=st=1749302932~exp=1749306532~hmac=8a70fbf502f315e6ce1249aebed32eaa6f1a64ad22ca425c75e20a578406aef9&w=1380"})`,
      }}
      className="relative md:h-[70vh] h-[60vh] flex items-center justify-center bg-yellow-500 "
    >
      <div className="absolute z-0 flex-col gap-2 bg-black/50 inset-0 flex justify-center items-center">
        <div className="md:w-[60vw] w-[90vw] text-center flex-col gap-6 items-center flex justify-center">
          <h1 className="md:text-[1.7rem] text-[1.5rem] text-white font-extrabold border-b-2 border-white">
            <CTranslateTo eng="Start Now" pt="Comece Agora" />
          </h1>
          <h3 className="md:text-xl text-lg text-yellow-50 font-medium">
            <CTranslateTo
              eng="Become a Flex Affiliate and increase your success at maximum 🚀"
              pt="Seja Afiliado FLEX e eleve o seu sucesso ao máximo  🚀"
            />
          </h3>
          <Link target="_blank" href={`/${langByCookies}/sign-up`}>
            <AuSoftUI.UI.Button
              variant={"primary"}
              className="w-fit rounded-full"
              size={"lg"}
            >
              <CTranslateTo
                eng="I want to be an FLEX Affiliate 💸"
                pt="Quero ser afiliado FLEX 💸"
              />
            </AuSoftUI.UI.Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
