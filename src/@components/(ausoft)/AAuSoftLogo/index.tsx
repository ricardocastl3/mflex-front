import { useAppProvider } from "@/providers/app/AppProvider";
import { localImages } from "@/utils/images";
import Image from "next/image";

export default function AAuSoftLogo({
  size,
  style,
}: {
  size: number;
  style?: string;
}) {
  const { isDarkMode } = useAppProvider();
  return (
    <Image
      width={size}
      height={size}
      src={isDarkMode ? localImages.logos.mflex : localImages.logos.mflex}
      alt="Logotipo da Marca Flex"
      className={`${style}`}
    />
  );
}
