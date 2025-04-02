import { useTranslate } from "@/providers/app/TranslateProvider";

interface IASeparatorProps {
  title_pt: string;
  title_eng: string;
}

export default function ASeparator({ title_eng, title_pt }: IASeparatorProps) {
  const { currentLang } = useTranslate();

  return (
    <div className="flex items-center gap-2.5">
      <span className="flex-1 p-[0.05rem] rounded-full bg-slate-200 dark:bg-slate-700"></span>
      <h3 className="text-slate-800 text-xs dark:text-white">
        {currentLang.code == "PT" ? title_pt : title_eng}
      </h3>
      <span className="flex-1 p-[0.05rem] rounded-full bg-slate-200 dark:bg-slate-700"></span>
    </div>
  );
}
