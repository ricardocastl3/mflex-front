import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function HeroSection() {
  return (
    <div className="flex md:h-[60vh] h-[50vh] md:pt-36 pt-8 md:pb-28 pb-0 relative justify-center items-center">
      <div className="flex absolute z-0 flex-col gap-2 md:w-[60vw] w-[90vw] items-center text-center">
        <h4 className="md:text-[2.5rem] md:leading-[2.7rem] leading-8 text-3xl dark:text-white">
          <CTranslateTo eng="Terms of Use" pt="Termos de Uso" />
        </h4>
        <h4 className="text-md dark:text-slate-400/80 text-slate-600">
          <CTranslateTo
            eng="Last update: 25/08/2024"
            pt="Última atualização: 12/12/2024"
          />
        </h4>
      </div>
    </div>
  );
}
