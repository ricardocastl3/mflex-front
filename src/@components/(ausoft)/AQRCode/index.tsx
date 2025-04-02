import QRCode from "react-qr-code";

export default function AQRCode({ url, size }: { url: string; size: number }) {
  return (
    <div className="">
      <QRCode value={url} style={{ width: size, height: size }} className="bg-transparent"/>
    </div>
  );
}
