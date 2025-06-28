import { AuSoftUI } from "@/@components/(ausoft)";
import { ICreator } from "@/http/interfaces/models/fhouse/ICreator";
import { localImages } from "@/utils/images";

export default function CoverBox({ creator }: { creator: ICreator }) {
  return (
    <div className="">
      <div className="relative">
        <div
          style={{
            height: "180px",
            width: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundImage: `url(${
              creator.cover || localImages.bgs.creatorBg
            })`,
          }}
          className="rounded-t-xl bg-slate-300 dark:bg-slate-800/50 "
        ></div>
        <div className="absolute flex-col gap-4 inset-x-0 -bottom-[2rem] justify-center flex">
          <div className="flex flex-col items-center w-full gap-4 justify-center">
            <div className="w-fit">
              <AuSoftUI.Component.Avatar
                size={90}
                width={90}
                wsite=""
                src={creator.user.photo || localImages.logos.flexUser.src}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
