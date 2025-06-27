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
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundImage: `url(${
              creator.cover ||
              "https://img.freepik.com/free-vector/bulb-idea-low-poly-wireframe-mesh_271628-313.jpg?t=st=1750875552~exp=1750879152~hmac=742895b5018dbc057906cd40824730d5e5ea30f64f87a4678281a893f362de39&w=1380"
            })`,
          }}
          className="rounded-t-xl"
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
