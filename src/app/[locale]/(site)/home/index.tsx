"use client";

import Hero from "./components/Hero";
import NewsSection from "./components/NewsSection";
import BannerSite from "../components/BannerSite";
import PodFlexSection from "./components/PodFlexSection";
import FlexSection from "./components/FlexSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <NewsSection />
      <FlexSection />
      <PodFlexSection />
      <BannerSite banner={2} />
    </div>
  );
}
