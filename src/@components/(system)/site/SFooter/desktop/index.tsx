import { BaseBox } from "@/@components/(box)/BaseBox";
import { useAppProvider } from "@/providers/app/AppProvider";
import { ReactIcons } from "@/utils/icons";
import { langByCookies } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";
import DownloadAppButton from "@/services/pwa/DownloadApp";

export default function SFooter() {
  const { segmentedLayout } = useAppProvider();
  return (
    <div>
      <BaseBox className="md:pl-28 pl-6 md:pr-8 pr-4  pt-16 pb-28 rounded-none dark:bg-ausoft-slate-950">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
          <div className="flex items-start gap-2 md:col-span-2 col-span-1">
            <div className="flex flex-col gap-2 md:w-[30vw] w-[90vw]">
              <h4 className="flex items-center gap-2 md:text-base text-base font-semibold dark:text-white">
                <ReactIcons.AiICon.AiFillBuild size={20} />
                <CTranslateTo eng="Who are we?" pt="Quem somos?" />
              </h4>
              <h4 className="md:text-base text-base text-slate-600 dark:text-slate-400">
                <CTranslateTo
                  eng="At Marca Flex, we are your ultimate entertainment destination. We bring you an immersive experience through our TV content, engaging podcasts, and seamless ticket marketplace. Whether you're looking for the latest game analysis, exclusive content, or event tickets, we've got you covered. Join us in creating memorable moments and connecting with your favorite entertainment."
                  pt="Na Marca Flex, somos seu destino definitivo de entretenimento. Oferecemos uma experiência imersiva através do nosso conteúdo de TV, podcasts envolventes e uma plataforma integrada de ingressos. Seja para análises de jogos, conteúdo exclusivo ou ingressos para eventos, estamos aqui para você. Junte-se a nós para criar momentos memoráveis e se conectar com seu entretenimento favorito."
                />
              </h4>
            </div>
          </div>
          <div className="grid md:grid-cols-1 grid-cols-2 gap-4 md:mt-0 mt-2">
            <div className="flex flex-col">
              <div className="flex items-start gap-2">
                <div className="flex flex-col gap-2">
                  <h4 className="flex items-center gap-2 md:text-base text-base font-semibold dark:text-white">
                    <ReactIcons.AiICon.AiFillAppstore size={20} />
                    <CTranslateTo eng="Download App" pt="Baixar Aplicativo" />
                  </h4>
                  <div className="flex flex-col gap-2">
                    <DownloadAppButton>
                      <button className="appearance-none text-slate-500 dark:text-slate-400 items-start flex gap-2 md:text-base text-base hover:opacity-50">
                        <ReactIcons.AiICon.AiFillAndroid size={18} />
                        Android
                      </button>
                    </DownloadAppButton>
                    <DownloadAppButton>
                      <button className="appearance-none text-slate-500 dark:text-slate-400 items-start flex gap-2 md:text-base text-base hover:opacity-50">
                        <ReactIcons.AiICon.AiFillApple size={18} />
                        iOS
                      </button>
                    </DownloadAppButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-start gap-2">
                <div className="flex flex-col gap-2">
                  <h4 className="flex items-center gap-2 md:text-base text-base font-semibold dark:text-white">
                    <ReactIcons.BiIcon.BiMapPin size={20} />
                    <CTranslateTo eng="Location" pt="Localização" />
                  </h4>
                  <h3 className="text-slate-500 dark:text-slate-400 md:text-base text-base">
                    Angola, Luanda
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:mt-0 mt-2">
            <div className="flex items-start gap-2">
              <div className="flex flex-col gap-2">
                <h4 className="md:text-base text-base flex items-center gap-2 font-semibold dark:text-white">
                  <ReactIcons.AiICon.AiOutlineLink size={20} />
                  <CTranslateTo eng="Extras" pt="Extras" />
                </h4>
                <div className="gap-2 flex flex-col w-full border-t pt-4 border-slate-300 dark:border-slate-800">
                  <Link
                    href={`/${langByCookies}/faqs`}
                    className="flex items-center gap-2 hover:opacity-60 cursor-pointer  md:text-base text-base  dark:text-slate-400"
                  >
                    <CTranslateTo eng="FAQs" pt="Perguntas Frequentes" />
                    <ReactIcons.BiIcon.BiLinkExternal size={16} />
                  </Link>
                  <div className="md:hidden flex flex-col gap-2">
                    <Link
                      href={`/${langByCookies}/policy/terms`}
                      className="flex items-center gap-2 hover:opacity-60  md:text-base text-base  dark:text-slate-400"
                    >
                      <CTranslateTo eng="Terms of Use" pt="Termos de Uso" />
                      <ReactIcons.BiIcon.BiLinkExternal size={16} />
                    </Link>
                    <Link
                      href={`/${langByCookies}/policy/privacy`}
                      className="flex items-center gap-2 hover:opacity-60  md:text-base text-base  dark:text-slate-400"
                    >
                      <CTranslateTo
                        eng="Privacy Policy"
                        pt="Políticas de Privacidade"
                      />
                      <ReactIcons.BiIcon.BiLinkExternal size={16} />
                    </Link>
                    <h4 className="dark:text-slate-400 md:text-base text-base">
                      Marca Flex@{new Date().getFullYear()}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseBox>
      <div className="md:flex items-center gap-8 hidden md:px-[7.28rem] px-2 py-4  md:mb-0 mb-16 text-sm dark:text-slate-300 bg-slate-100 dark:bg-ausoft-slate-900">
        <h4 className="col-span-3">Marca Flex@{new Date().getFullYear()}</h4>
        <Link
          href={`/${segmentedLayout}/policy/terms`}
          className="hover:opacity-60"
        >
          <CTranslateTo eng="Terms of Use" pt="Termos de Uso" />
        </Link>
        <Link
          href={`/${segmentedLayout}/policy/privacy`}
          className="hover:opacity-60"
        >
          <CTranslateTo eng="Privacy Policy" pt="Políticas de Privacidade" />
        </Link>
      </div>
    </div>
  );
}
