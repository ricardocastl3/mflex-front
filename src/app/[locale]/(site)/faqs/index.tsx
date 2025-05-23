"use client";

import { useState } from "react";
import { AuSoftUI } from "@/@components/(ausoft)";
import { faqTickets, faqFlexTv, faqFlexMovie } from "./components/faqsItems";

import HeroFaqs from "./components/Hero";
import CollapseItem from "./components/CollapseItem";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function FaqsPage() {
  const [currectSection, setCurrentSection] = useState("services");

  return (
    <div className="flex flex-col w-full md:pb-4 pb-4">
      <HeroFaqs />
      <div className="flex flex-col gap-5 md:px-[7rem] px-5 md:py-12 py-8">
        <div className="md:w-[20vw] w-full">
          <h1 className="text-base dark:text-white"></h1>
          <AuSoftUI.UI.Select
            className="w-full md:text-[1.07rem] font-bold text-base dark:bg-transparent bg-white"
            weight={"md"}
            value={currectSection}
            onChange={(e) => setCurrentSection(e.target.value)}
          >
            <option
              value={"flex-tv"}
              className="dark:bg-ausoft-slate-950 dark:text-white"
            >
              <CTranslateTo eng="Flex TV" pt="Flex TV" />
            </option>
            <option
              value={"flex-movie"}
              className="dark:bg-ausoft-slate-950 dark:text-white"
            >
              <CTranslateTo eng="Flex TV" pt="Flex TV" />
            </option>
            <option
              value={"tickets"}
              className="dark:bg-ausoft-slate-950 dark:text-white"
            >
              <CTranslateTo eng="Events & Tickets" pt="Eventos & Ingressos" />
            </option>
          </AuSoftUI.UI.Select>
        </div>
        <div className="flex flex-col gap-4 ">
          {currectSection == "tickets" && (
            <>
              {faqTickets.map((faq, index) => (
                <CollapseItem
                  key={index}
                  title_en={faq.t_en}
                  title_pt={faq.t_pt}
                  content_en={faq.d_en}
                  content_pt={faq.d_pt}
                />
              ))}
            </>
          )}
          {currectSection == "flex-tv" && (
            <>
              {faqFlexTv.map((faq, index) => (
                <CollapseItem
                  key={index}
                  title_en={faq.t_en}
                  title_pt={faq.t_pt}
                  content_en={faq.d_en}
                  content_pt={faq.d_pt}
                />
              ))}
            </>
          )}

          {currectSection == "flex-movie" && (
            <>
              {faqFlexMovie.map((faq, index) => (
                <CollapseItem
                  key={index}
                  title_en={faq.t_en}
                  title_pt={faq.t_pt}
                  content_en={faq.d_en}
                  content_pt={faq.d_pt}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
