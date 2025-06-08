import { stepToBecome } from "./services";
import { Meteors } from "@/@components/(aceternity)/Meteors";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CardItem from "../CardItem";
import ASoundPlayer from "@/@components/(system)/ASoundPlayer";

export default function BecomeAffilate() {
  return (
    <div className="flex flex-col gap-8 md:px-16 px-5">
      <ASoundPlayer />
      <div className="flex flex-col gap-2">
        <h1 className="text-[1.2rem] font-bold dark:text-white">
          <CTranslateTo
            eng="How to become a affiliate?"
            pt="Como se tornar afiliado ?"
          />
        </h1>
        <h1 className="dark:text-slate-400 text-slate-600s">
          <CTranslateTo
            eng="These are the simple steps to become our affiliate..."
            pt="Estes são os passos simples para ser nosso afiliado..."
          />
        </h1>
      </div>
      <div className="relative grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4">
        {stepToBecome.map((service, i) => {
          return <CardItem key={i} service={service} />;
        })}

        {window.innerWidth > 765 && <Meteors number={10} />}
      </div>
    </div>
  );
}
