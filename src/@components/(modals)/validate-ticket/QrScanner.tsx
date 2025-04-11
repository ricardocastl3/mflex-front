import { AuSoftUI } from "@/@components/(ausoft)";
import { Html5Qrcode, CameraDevice } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";

const QrScanner = ({ onScan }: { onScan: (code: string) => void }) => {
  const [allCamera, setAllCamera] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const qrCodeRegionId = "reader";
    html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);

    const startScanning = async (cameraId: string) => {
      try {
        if (!html5QrCodeRef.current) return;

        await html5QrCodeRef.current.start(
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
      } catch (err) {
        console.error("Erro ao iniciar a câmera:", err);
      }
    };

    const getCameras = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          setAllCamera(devices);
          const cameraId = selectedCamera || devices[0].id;
          await startScanning(cameraId);
        }
      } catch (err) {
        console.error("Erro ao acessar câmera:", err);
      }
    };

    getCameras();

    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, [onScan, selectedCamera]);

  return (
    <div className="flex flex-col gap-2">
      <div id="reader" className="md:w-[100%] w-[100%] md:h-[100%] h-[50%]" />
      <div className="">
        <AuSoftUI.UI.Select
          className="w-full dark:bg-ausoft-slate-900 dark:text-white"
          onChange={(e) => setSelectedCamera(e.target.value)}
          value={selectedCamera}
          weight={"sm"}
        >
          {allCamera.map((cam, i) => (
            <option key={i} value={cam.id}>
              {cam.label}
            </option>
          ))}
        </AuSoftUI.UI.Select>
      </div>
    </div>
  );
};

export default QrScanner;
