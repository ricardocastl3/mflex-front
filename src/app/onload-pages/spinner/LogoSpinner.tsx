import "./styles.css";
import { localImages } from "@/utils/images";
import Image from "next/image";

export default function LogoSpinner() {
  return (
    <div className="spinner">
      <div className="rounded-full">
        <Image
          width={70}
          height={70}
          src={localImages.logos.mflex}
          alt="Logotipo da AuSoft Develpo"
        />
      </div>
      <div className="spinner-sector spinner-sector-red"></div>
      <div className="spinner-sector spinner-sector-green"></div>
    </div>
  );
}
