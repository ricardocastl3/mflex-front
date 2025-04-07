"use client";

import { INews } from "@/http/interfaces/models/INews";
import { useCallback, useState } from "react";
import { ReactIcons } from "@/utils/icons";

import NewSkeleton from "./NewSkeleton";
import HeroNews from "../components/Hero";

export default function PreviewNew({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<INews | undefined>();

  const fetchNews = useCallback(() => {
    try {
    } catch (err) {}
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <div className="relative">
          <HeroNews />
          <div className="absolute inset-0 justify-center flex items-center">
            <ReactIcons.PiIcon.PiSpinner
              size={40}
              className="animate-spin text-white"
            />
          </div>
        </div>
        <NewSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <HeroNews />
      <div>OIIIII</div>
    </div>
  );
}
