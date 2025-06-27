import React from "react";

export default function ContainerBase({
  children,
  customHeight = "h-[72vh]",
  ref,
}: {
  customHeight?: string;
  children: React.ReactNode;
  ref?: any;
}) {
  return (
    <div
      ref={ref}
      className={`${customHeight} flex flex-col gap-4 overflow-y-auto md:pb-4 pb-12 md:pt-0 pt-4 md:pr-2 pr-0`}
    >
      {children}
    </div>
  );
}
