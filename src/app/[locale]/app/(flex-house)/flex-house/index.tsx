"use client";

import { ReactIcons } from "@/utils/icons";
import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";
import { BaseBox } from "@/@components/(box)/BaseBox";

import PageBase from "../../@components/PageBase";
import Feed from "./components/feed";
import Reels from "./components/reels";
import TabButton from "./components/TabButton";
import ContainerBase from "../../@components/ContainerBase";
import ForYouTab from "./components/for-you";

export default function FlexHousePage() {
  const { selectedFHTab } = useFlexHouseProvider();
  return (
    <PageBase customTop="md:pt-[4rem] pt-[4.5rem]">
      <div className="flex items-center">
        <BaseBox className="md:w-full w-[88vw] overflow-x-auto px-[0.1rem] flex items-center md:justify-center justify-start p-0.5 rounded-2xl">
          <TabButton
            Icon={ReactIcons.MdIcon.MdNewspaper}
            t_en="Feed"
            t_pt="Feed"
          />
          {/*  <TabButton
            Icon={ReactIcons.AiICon.AiOutlineUser}
            t_en="For you"
            t_pt="Para Si"
          /> */}
          <TabButton
            Icon={ReactIcons.Hi2Icon.HiPlay}
            t_en="Shorts"
            t_pt="Shorts"
          />
          {/*  <TabButton
            Icon={ReactIcons.Hi2Icon.HiMusicalNote}
            t_en="Musics"
            t_pt="Músicas"
          />
          <TabButton
            Icon={ReactIcons.Hi2Icon.HiHeart}
            t_en="Podcasts"
            t_pt="Podcasts"
          /> */}
        </BaseBox>
      </div>
      <ContainerBase>
        {selectedFHTab == "feed" && <Feed />}
        {selectedFHTab == "shorts" && <Reels />}
        {selectedFHTab == "for you" && <ForYouTab />}
      </ContainerBase>
    </PageBase>
  );
}
