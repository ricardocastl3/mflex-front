import { useAppProvider } from "@/providers/app/AppProvider";
import { ReactIcons } from "@/utils/icons";
import { Button } from "@/@components/ui/Button";
import { ausoftApplications } from "@/utils/applications";
import { AuSoftUI } from "@/@components/(ausoft)";

import Link from "next/link";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function AuSoftAppsDropdownContent({
  callback,
}: {
  callback?: () => void;
}) {
  return (
    <div className="md:w-[350px] w-[82vw]">
      <div className="flex items-start gap-2.5 pb-2.5 border-b border-slate-300 dark:border-slate-700/60">
        <AuSoftUI.Component.AuSoftLogo size={22} style="mt-0.5" />

        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <h3 className="md:text-[0.89rem] text-md font-bold text-slate-800 dark:text-white">
              <CTranslateTo pt="Produtos AuSoft" eng="AuSoft Products" />
            </h3>
            {callback && (
              <button
                onClick={callback}
                className="rounded-md  hover:opacity-80 text-slate-800 dark:text-slate-200"
              >
                <ReactIcons.BiIcon.BiX size={25} className="mb-1.5" />
              </button>
            )}
          </div>
          <h3 className="text-[0.82rem] text-slate-500 dark:text-slate-400">
            <CTranslateTo
              pt="Você escolhe e nós entregamos o melhor para você"
              eng="You choose and we deliver the best to you"
            />
          </h3>
        </div>
      </div>
      <div className="mt-4 flex items-start gap-2.5 flex-col md:h-[45vh] h-[30vh] scroll-smooth overflow-y-auto">
        <span className="px-2.5 py-1 rounded-full text-xs flex items-end gap-1.5 w-fit bg-violet-400/15 dark:bg-violet-950/30 text-violet-500 dark:text-violet-300">
          <ReactIcons.MdIcon.MdCircle size={15} className="mb-0.5" />
          <CTranslateTo pt="Para Individuais" eng="For Individuals" />
        </span>
        <div className="flex md:justify-between justify-start items-center gap-4 my-4 flex-wrap">
          {ausoftApplications
            .filter((item) => item.workspace == "suite" && item.active)
            .map((app, index) => {
              return (
                <Link
                  key={index}
                  href={app.url}
                  target="_blank"
                  className="cursor-pointer w-24 transition-all duration-300 border-slate-400 dark:bg-violet-950/20 dark:text-white hover:bg-violet-200 dark:hover:bg-violet-950/70 bg-violet-100/50 p-3 rounded-xl flex flex-col items-center gap-1.5"
                >
                  <img
                    src={app.logo}
                    width={45}
                    height={50}
                    alt={`Produto ${app.name}`}
                  />
                  <h3 className="text-xs ">{app.name}</h3>
                </Link>
              );
            })}
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs flex items-end gap-1.5 w-fit bg-violet-400/15 dark:bg-violet-950/30 text-violet-500 dark:text-violet-300">
          <ReactIcons.MdIcon.MdCircle size={15} className="mb-0.5" />
          <CTranslateTo pt="Para Empresas" eng="For Businesses" />
        </span>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-4  pt-2">
          {ausoftApplications
            .filter((item) => item.workspace == "panel" && item.active)
            .map((app, index) => {
              return (
                <Link
                  key={index}
                  href={app.url}
                  target="_blank"
                  className="cursor-pointer w-24 transition-all duration-300 border-slate-400 dark:bg-violet-950/20 dark:text-white hover:bg-violet-200 dark:hover:bg-violet-950/70 bg-violet-100/50 p-3 rounded-xl flex flex-col items-center gap-1.5"
                >
                  <img
                    src={app.logo}
                    width={45}
                    height={50}
                    alt={`Produto ${app.name}`}
                  />
                  <h3 className="text-xs ">{app.name}</h3>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col w-full gap-1.5 mt-4 box-content">
        <Button
          size={"sm"}
          variant={"outline"}
          className="w-full justify-center rounded-full"
        >
          <CTranslateTo eng="All Products" pt="  Ver todos os produtos" />
        </Button>
      </div>
    </div>
  );
}
