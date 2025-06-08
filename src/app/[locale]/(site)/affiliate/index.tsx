"use client";

import HeroServices from "./components/Hero";
import BecomeAffilate from "./components/sections/BecomeAffilate";
import BenefitsAffiliate from "./components/sections/Benefis";
import UpgradeSectionAffiliate from "./components/sections/Upgrade";
import UpLevelSectionAffiliate from "./components/sections/UpLevel";

export default function AffiliatePublicPage() {
  return (
    <div className="flex flex-col gap-4">
      <HeroServices />
      <div className="flex flex-col gap-8 mt-8">
        <BecomeAffilate />
        <UpLevelSectionAffiliate />
        <BenefitsAffiliate />
        <UpgradeSectionAffiliate />
      </div>
    </div>
  );
}
