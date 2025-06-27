"use client";

import { useAppProvider } from "@/providers/app/AppProvider";
import { ReactNode } from "react";

export default function PageBase({
  children,
  customTop,
}: {
  customTop?: string;
  children: ReactNode;
}) {
  const { openBanner } = useAppProvider();
  return (
    <div
      className={`${
        openBanner
          ? customTop
            ? customTop
            : "md:pt-[7rem] pt-28"
          : customTop
          ? customTop
          : "md:pt-[5.2rem] pt-20"
      } flex flex-col gap-4`}
    >
      {children}
    </div>
  );
}
