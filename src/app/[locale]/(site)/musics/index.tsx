"use client";

import HeroMusics from "./components/Hero";
import MusicsContainer from "./components/container";

export default function SiteMusicsPage() {
  return (
    <div className="flex flex-col gap-4">
      <HeroMusics />
      <MusicsContainer />
    </div>
  );
}
