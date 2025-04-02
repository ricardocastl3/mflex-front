"use client";

import { useAppProvider } from "@/providers/app/AppProvider";
import { HomeCards } from "./components";
import { useAuth } from "@/providers/auth/AuthProvider";

import CardCharts from "./components/charts/card-charts";

export default function Home() {
  const { openBanner } = useAppProvider();
  const { userLogged } = useAuth();
  
  return (
    <div
      className={`${
        openBanner ? "md:h-[75vh] h-[90vh]" : "md:h-[80vh] h-[90vh]"
      } flex flex-col md:gap-8 gap-4 md:pb-4 pb-12 md:pr-2 pr-0 overflow-y-auto`}
    >
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
        <HomeCards.CardBooks />
        <HomeCards.CardShelf />
        <HomeCards.CardCategories />
      </div>
      <div>
        <CardCharts />
      </div>
    </div>
  );
}
