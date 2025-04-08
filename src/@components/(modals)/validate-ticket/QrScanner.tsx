import { AuSoftUI } from "@/@components/(ausoft)";
import { Html5Qrcode, CameraDevice } from "html5-qrcode";
import { useEffect, useState } from "react";

const QrScanner = ({ onScan }: { onScan: (code: string) => void }) => {
  const [allCamera, setAllCamera] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState("");

  useEffect(() => {
    const qrCodeRegionId = "reader";
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);

    if (selectedCamera != "") {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            setAllCamera(devices);

            const cameraId = selectedCamera;

            html5QrCode.start(
              cameraId,
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
              },
              (decodedText) => {
                onScan(decodedText);
              },
              (error) => {}
            );
          }
        })
        .catch((err) => {
          console.error("Erro ao acessar câmera:", err);
        });
    } else {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            setAllCamera(devices);

            const cameraId = devices[0].id;

            html5QrCode.start(
              cameraId,
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
              },
              (decodedText) => {
                onScan(decodedText);
              },
              (error) => {}
            );
          }
        })
        .catch((err) => {
          console.error("Erro ao acessar câmera:", err);
        });
    }

    return () => {
      html5QrCode.stop().catch(console.error);
    };
  }, [onScan, selectedCamera]);

  return (
    <div className="flex flex-col gap-2">
      <div
        id="reader"
        style={{ width: "100%", height: "100%", borderRadius: 20 }}
      />
      <div className="">
        <AuSoftUI.UI.Select
          className="w-full dark:bg-ausoft-slate-900 dark:text-white"
          onChange={(e) => setSelectedCamera(e.target.value)}
          value={selectedCamera}
          weight={"sm"}
        >
          {allCamera.map((cam, i) => {
            return <option value={cam.id}>{cam.label}</option>;
          })}
        </AuSoftUI.UI.Select>
      </div>
    </div>
  );
};

export default QrScanner;
