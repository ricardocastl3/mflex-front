import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { localImages } from "@/utils/images";

export default function HeroAbout() {
  return (
    <div
      style={{
        objectFit: "fill",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: window.innerWidth <= 765 ? "center" : "",
        backgroundImage: `url(https://img.freepik.com/free-photo/sassy-cute-feminine-africanamerican-girl-s-headband-sweater-smiling-cheeky-flirty-look-camera-tur_1258-142573.jpg?t=st=1745158867~exp=1745162467~hmac=bb2f537c3d1395910b639f26d6c06d9c6dbf0aed78e62289d2bf0493cf4337e6&w=1380)`,
        backgroundSize: "cover",
      }}
      className="md:h-[55vh] h-[40vh] flex-col relative flex md:items-start items-center md:text-start text-center justify-center md:px-14 px-4"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="flex flex-col gap-2 z-20">
        <h1 className="md:text-[2rem] text-[1.7rem] font-bold text-white">
          <CTranslateTo eng="Discover Who We Are" pt="Descubra Quem Somos" />
        </h1>
        <h4 className="text-white md:mt-2 t-2 text-lg">
          <CTranslateTo
            eng="Your Entertainment Universe 🚀"
            pt="O Seu Universo Do Entretenimento 🚀"
          />
        </h4>
      </div>
    </div>
  );
}
