import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";

const QrScanner = ({ onScan }: { onScan: (code: string) => void }) => {
  useEffect(() => {
    const qrCodeRegionId = "reader";
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
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

    return () => {
      html5QrCode.stop().catch(console.error);
    };
  }, [onScan]);

  return (
    <div
      id="reader"
      style={{ width: "100%", height: "100%", borderRadius: 20 }}
    />
  );
};

export default QrScanner;
