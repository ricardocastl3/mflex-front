import { AuSoftUI } from "@/@components/(ausoft)";
import { useTranslate } from "@/providers/app/TranslateProvider";
import { langByCookies } from "@/http/axios/api";
import { useCategoryProvider } from "@/providers/features/CategoryProvider";

import ContentCategory from "./CContentCategory";

export default function SelectCategoryDropdown({
  view,
}: {
  view: "events" | "news" | "podflex" | "musics";
}) {
  
  const { currentLang } = useTranslate();
  const { selectedCategory } = useCategoryProvider();

  return (
    <AuSoftUI.Component.Dropdown
      right={false}
      trigger={
        <div className="w-full flex flex-col gap-2">
          <AuSoftUI.UI.TextField.Default
            requiredField={!selectedCategory}
            value={
              selectedCategory
                ? selectedCategory.name
                : currentLang.code == "EN"
                ? "----- Select category -----"
                : "----- Selecione a categoria -----"
            }
            readOnly
            className="w-full z-0 cursor-pointer"
          />
          {!selectedCategory && (
            <AuSoftUI.Component.RequiredTextField
              text={
                langByCookies == "pt"
                  ? "Informe qual categoria deseja usar"
                  : "Enter witch category you want to use"
              }
            />
          )}
        </div>
      }
      DesktopContent
      MobileContent={(e) => (
        <ContentCategory view={view} callback={() => e.callback()} />
      )}
      DesktopContentElement={(e) => (
        <ContentCategory view={view} callback={() => e.callback!()} />
      )}
    />
  );
}
