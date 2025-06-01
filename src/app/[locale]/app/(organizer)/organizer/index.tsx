"use client";

import { ReactIcons } from "@/utils/icons";
import { organizerServices } from "./components/services";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import PageBase from "../../@components/PageBase";
import ContainerBase from "../../@components/ContainerBase";
import CardOrganizerItem from "./components/card-items";

export default function OrganizerPage() {
  return (
    <PageBase>
      <div className="flex items-center border-b pb-2 border-slate-300 dark:border-slate-800">
        <h4 className="flex items-center gap-2 font-bold text-xl dark:text-white">
          <ReactIcons.FaIcon.FaCalendarWeek size={18} />
          <CTranslateTo eng="Organizer Dashboard" pt="Painel do organizador" />
        </h4>
      </div>

      <ContainerBase>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 md:p-4 p-0.5">
          {organizerServices.map((service, i) => {
            return <CardOrganizerItem service={service} key={i} />;
          })}
        </div>
      </ContainerBase>
    </PageBase>
  );
}
