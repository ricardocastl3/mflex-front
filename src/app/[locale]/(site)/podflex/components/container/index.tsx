import { AuSoftUI } from "@/@components/(ausoft)";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function NewsContainer() {
  return (
    <div className="flex flex-col gap-5 relative">
      <div className="z-20 flex w-full items-center justify-center absolute -top-24 flex-col gap-4">
        <div className="w-full justify-center text-center">
          <h4 className="text-white font-bold md:text-2xl text-xl">
            <CTranslateTo
              eng="The Best PodCasts 🎙️"
              pt="Os Melhores PodCasts 🎙️"
            />
          </h4>
        </div>
        <AuSoftUI.UI.TextField.Default
          placeholder="Ex: Fly PodCast...."
          weight={"lg"}
          className="rounded-full text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
        />
      </div>
    </div>
  );
}
