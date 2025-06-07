import { benefits } from "./services";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CardItem from "../CardItem";

export default function BenefitsAffiliate() {
  return (
    <div className="flex flex-col gap-8 md:px-16 px-5 my-8 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-[1.2rem] font-bold dark:text-white">
          <CTranslateTo
            eng="Benefits of being our affiliate"
            pt="Benefícios em ser nosso afiliado"
          />
        </h1>
        <h1 className="dark:text-slate-400 text-slate-600s">
          <CTranslateTo
            eng="These are the simple steps to become our affiliate..."
            pt="Estes são os passos simples para ser nosso afiliado..."
          />
        </h1>
      </div>
      <div
        data-aos="fade-up"
        className="relative grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4"
      >
        {benefits.map((service, i) => {
          return <CardItem key={i} service={service} />;
        })}
      </div>
    </div>
  );
}
