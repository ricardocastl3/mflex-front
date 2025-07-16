import Image from "next/image";

export default function AAvatar({
  size,
  wsite,
  width,
  src,
}: {
  src?: string;
  size: number;
  width: number;
  wsite: string;
}) {
  return (
    <div className="cursor-pointer border-2 bg-yellow-700 rounded-full border-yellow-600">
      <Image
        width={width}
        height={size}
        src={src!}
        alt="Avatar"
        className="rounded-full"
      />
    </div>
  );
}
