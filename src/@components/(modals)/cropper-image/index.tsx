import { Dispatch, SetStateAction } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

export default function CropperImage({
  setSrc,
  src,
}: {
  src: string;
  setSrc: Dispatch<SetStateAction<string>>;
}) {
  const onChange = (cropper: CropperRef) => {
    console.log(cropper.getCanvas(), cropper.getImage());
  };

  return <Cropper src={src} onChange={onChange} className="cropper" />;
}
