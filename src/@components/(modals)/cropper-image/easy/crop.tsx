import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useAppProvider } from "@/providers/app/AppProvider";
import { getCroppedImg } from "./canva";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import BaseModal from "../../base";

export default function CropImageModal() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const { handleOpenModal } = useModal();
  const { croppedImageSelected, handleSelectedCroppImage } = useAppProvider();

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        croppedImageSelected?.selected,
        croppedAreaPixels
      );
      handleSelectedCroppImage({
        extracted: croppedImage as string,
        selected: "",
      });
    } catch (e) {}
  };

  return (
    <BaseModal callbackClose={() => handleOpenModal("")}>
      <div className="flex flex-col items-center gap-4 p-8 md:w-[50vw] w-[80vw] md:h-[60vh] h-[80vh] ">
        <div>
          <Cropper
            classes={{ containerClassName: "rounded-xl" }}
            image={croppedImageSelected?.selected}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            cropSize={{ height: 300, width: 300 }}
            onZoomChange={setZoom}
            objectFit={"contain"}
          />
        </div>
        <div className="absolute md:bottom-8 bottom-16 flex items-center flex-col gap-4">
          <input
            type="range"
            value={zoom}
            min={0.4}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            className="apperance-none bg-violet-500 dark:bg-violet-900 w-48"
            onChange={(e) => {
              setZoom(Number(e.target.value));
            }}
          />
          <div className="grid grid-cols-2 gap-4">
            <AuSoftUI.UI.Button
              onClick={() => {
                showCroppedImage();
                if (croppedImageSelected?.modal == "artist-profile") {
                  handleOpenModal("artist-info");
                } else {
                  handleOpenModal("");
                }
              }}
              variant={"green"}
              className="rounded-full pt-1 pb-1 px-4 justify-center items-center"
            >
              <CTranslateTo eng="Finish cropping" pt="Concluir recorte" />
            </AuSoftUI.UI.Button>
            <AuSoftUI.UI.Button
              onClick={() => {
                if (croppedImageSelected?.modal == "artist-profile") {
                  handleOpenModal("artist-info");
                } else {
                  handleOpenModal("");
                }
              }}
              variant={"destructive"}
              className="rounded-full pt-1 pb-1 px-4 justify-center items-center"
            >
              <CTranslateTo eng="Cancel" pt="Cancelar" />
            </AuSoftUI.UI.Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
