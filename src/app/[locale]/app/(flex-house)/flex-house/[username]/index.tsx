"use client";

import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";

import PageBase from "../../../@components/PageBase";
import ContainerBase from "../../../@components/ContainerBase";
import CoverBox from "./box/CoverBox";

export default function FlexHousePage() {
  const { selectedFHTab } = useFlexHouseProvider();
  return (
    <PageBase customTop="md:pt-[4.5rem] pt-[4.5rem]">
      <ContainerBase customHeight="h-[80vh]">
        <div className="flex flex-col gap-4">
          <CoverBox />
          <div className="md:mt-10 mt-8 flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-2 md:w-[50vw] w-[80vw]">
                <h1 className="dark:text-white text-xl font-extrabold">
                  Ricardo Castle
                </h1>
                <span className="text-base text-center dark:text-slate-400 text-slate-600">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
                  veritatis aliquid
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-b border-slate-300/80 dark:border-slate-800 p-2">
              <div>
                <AuSoftUI.UI.Button variant={"outline"}>
                  <ReactIcons.AiICon.AiFillEdit size={10} />
                </AuSoftUI.UI.Button>
              </div>
            </div>
          </div>
        </div>
      </ContainerBase>
    </PageBase>
  );
}
