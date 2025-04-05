"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { useEffect, useState } from "react";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import BoxCategories from "../../../components/BoxCategories";
import NewsCard from "./NewsCard";

export default function NewsContainer() {
  const [items, setItems] = useState<number>(3);
  const [isLoading, setIsLoading] = useState(false);

  const getItemIndex = (i: number) => {
    return i % 3; // Retorna 0, 1, 2
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;

      const height = window.innerWidth > 765 ? 200 : 500;

      if (items >= 10) return;

      if (scrollTop + clientHeight >= scrollHeight - height) {
        setIsLoading(true);
        setTimeout(() => {
          setItems((prev) => prev + 3);
          setIsLoading(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="flex flex-col gap-5 relative md:mb-28 mb-12">
      <div className="z-20 flex w-full items-center justify-center absolute -top-24 flex-col gap-4">
        <div className="w-full justify-center text-center">
          <h4 className="text-white font-bold md:text-2xl text-xl">
            <CTranslateTo eng="The big news 🔥" pt="As Grandes Novidades 🔥" />
          </h4>
        </div>
        <AuSoftUI.UI.TextField.Default
          placeholder="Ex: Fly PodCast...."
          weight={"lg"}
          className="rounded-full text-lg text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
        />
      </div>

      <BoxCategories />

      <div className="flex flex-col md:px-[3rem] px-5">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {Array.from({ length: items }).map((_, i) => {
            const currentIndex = getItemIndex(i);

            return (
              <NewsCard
                key={i}
                index={currentIndex}
                news={{
                  id: "djff",
                  created_at: new Date(),
                  title: "ANGOTIC 2025 - Junho",
                  source: "Angop",
                  slug: "angotic-2025",
                  image_url:
                    "https://images.pexels.com/photos/8554381/pexels-photo-8554381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
              />
            );
          })}
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <ReactIcons.PiIcon.PiSpinner
              size={40}
              className="animate-spin dark:text-slate-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
