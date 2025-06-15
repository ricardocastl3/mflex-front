import React from "react";

export default function ContainerBase({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade flex flex-col gap-4 h-[72vh] overflow-y-auto md:pb-4 pb-12 md:pt-0 pt-4 md:pr-2 pr-0">
      {children}
    </div>
  );
}
