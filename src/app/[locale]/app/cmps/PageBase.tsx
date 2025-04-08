import { useAppProvider } from "@/providers/app/AppProvider";
import { ReactNode } from "react";

export default function PageBase({ children }: { children: ReactNode }) {
  const { openBanner } = useAppProvider();
  return (
    <div
      className={`${
        openBanner ? "md:pt-[7rem] pt-28" : "md:pt-[5.2rem] pt-20"
      } flex flex-col gap-4`}
    >
      {children}
    </div>
  );
}
