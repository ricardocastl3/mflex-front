import { BaseBox } from "@/@components/(box)/BaseBox";
import { useAppProvider } from "@/providers/app/AppProvider";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";

export default function SFooter() {
  const { segmentedLayout } = useAppProvider();
  return (
    <div>
      <BaseBox className="md:pl-28 pl-8 md:pr-8 pr-4  pt-16 pb-28 rounded-none dark:bg-ausoft-slate-900">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
          <div className="flex items-start gap-2 md:col-span-2 col-span-1">
            <div className="flex flex-col gap-2 md:w-[30vw] w-[90vw]">
              <h4 className="md:text-base text-sm font-semibold dark:text-white">
                <CTranslateTo eng="Who are we?" pt="Quem somos?" />
              </h4>
              <h4 className="md:text-base text-sm text-slate-600 dark:text-slate-400">
                <CTranslateTo
                  eng="Lora is a product of AuSoft Develop in which she is a sales assistant for hire, whose objective is to serve business customers via WhatsApp."
                  pt="A Lora é um produto da AuSoft Develop na qual ela é uma assistente de vendas em aluguer, que tem como objetivo atender a clientes de empreendedores por meio do whatsapp."
                />
              </h4>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex items-start gap-2">
                <div className="flex flex-col gap-2">
                  <h4 className="md:text-base text-sm font-semibold dark:text-white">
                    <CTranslateTo eng="Download App" pt="Baixar Aplicativo" />
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Link
                      className="text-slate-500 dark:text-slate-400 items-start flex gap-2 md:text-base text-sm hover:opacity-50"
                      href={"mailto:contacto@ausoftdevelop.com"}
                    >
                      <ReactIcons.AiICon.AiFillAndroid size={18} />
                      Android
                    </Link>
                    <Link
                      className="text-slate-500 dark:text-slate-400 items-start flex gap-2 md:text-base text-sm hover:opacity-50"
                      href={"mailto:contacto@ausoftdevelop.com"}
                    >
                      <ReactIcons.AiICon.AiFillApple size={18} />
                      iOS
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-start gap-2">
                <div className="flex flex-col gap-2">
                  <h4 className="md:text-base text-sm font-semibold dark:text-white">
                    <CTranslateTo eng="Location" pt="Localização" />
                  </h4>
                  <h3 className="text-slate-500 dark:text-slate-400 md:text-base text-sm">
                    Angola, Luanda
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-start gap-2">
              <div className="flex flex-col gap-2">
                <h4 className="md:text-base text-sm font-semibold dark:text-white">
                  <CTranslateTo eng="AuSoft Community" pt="Comunidade AuSoft" />
                </h4>
                <Link
                  target="_blank"
                  className="text-violet-600 animate-pulse dark:text-violet-400 flex items-start gap-2 md:text-base text-md hover:opacity-50"
                  href={"https://chat.whatsapp.com/H0xLGMSVoJFKLvsoKMbAb0"}
                >
                  <ReactIcons.AiICon.AiOutlineWhatsApp size={18} />
                  <CTranslateTo eng="On WhatsApp" pt="No WhatsApp" />
                </Link>
                <Link
                  target="_blank"
                  className="text-violet-600 animate-pulse dark:text-violet-400 flex items-start gap-2 md:text-base text-md hover:opacity-50"
                  href={"https://discord.gg/t8PmV5a8Jk"}
                >
                  <ReactIcons.AiICon.AiFillDiscord size={18} />
                  <CTranslateTo eng="On Discord" pt="No Discord" />
                </Link>

                <div className="gap-2 flex flex-col border-t pt-4 border-slate-300 dark:border-slate-800">
                  <Link
                    target="_blank"
                    href={
                      segmentedLayout == "pt"
                        ? "https://ausoftdevelop.tawk.help/category/ausoft-lora"
                        : "https://ausoftdevelop.tawk.help/en-us/category/ausoft-lora"
                    }
                    className="hover:opacity-60 cursor-pointer  md:text-base text-sm  dark:text-slate-400"
                  >
                    <CTranslateTo eng="FAQs" pt="Perguntas Frequentes" />
                  </Link>
                  <div className="md:hidden flex flex-col gap-2">
                    <Link
                      href={`/${segmentedLayout}/policy/terms`}
                      className="hover:opacity-60  md:text-base text-sm  dark:text-slate-400"
                    >
                      <CTranslateTo eng="Terms of Use" pt="Termos de Uso" />
                    </Link>
                    <Link
                      href={`/${segmentedLayout}/policy/privacy`}
                      className="hover:opacity-60  md:text-base text-sm  dark:text-slate-400"
                    >
                      <CTranslateTo
                        eng="Privacy Policy"
                        pt="Políticas de Privacidade"
                      />
                    </Link>
                    <h4 className="dark:text-slate-400 md:text-base text-sm">
                      AuSoft Develop@{new Date().getFullYear()}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseBox>
      <div className="md:flex items-center gap-8 hidden md:px-[7.32rem] px-2 py-4  md:mb-0 mb-16 text-sm dark:text-slate-300 bg-slate-100 dark:bg-ausoft-slate-900">
        <h4 className="col-span-3">
          AuSoft Develop@{new Date().getFullYear()}
        </h4>
        <Link
          target="__blank"
          href={`${process.env.AUSOFT_PUBLIC_URL}/${segmentedLayout}/policy/terms`}
          className="hover:opacity-60"
        >
          <CTranslateTo eng="Terms of Use" pt="Termos de Uso" />
        </Link>
        <Link
          target="__blank"
          href={`${process.env.AUSOFT_PUBLIC_URL}/${segmentedLayout}/policy/privacy`}
          className="hover:opacity-60"
        >
          <CTranslateTo eng="Privacy Policy" pt="Políticas de Privacidade" />
        </Link>
      </div>
    </div>
  );
}
