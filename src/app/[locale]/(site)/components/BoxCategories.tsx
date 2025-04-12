import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useCategoryProvider } from "@/providers/features/CategoryProvider";

import useCategory from "@/hooks/api/useCategory";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function BoxCategories({
  callback,
  view,
}: {
  view: "events" | "news" | "podflex";
  callback: (e: string) => void;
}) {
  const { allCategory, isLoadingCategory } = useCategory({ view });
  const { selectedCategory, handleSelectCategory } = useCategoryProvider();

  return (
    <BaseBox className="md:w-auto w-[88vw] flex md:py-4 py-3 justify-center md:px-8 px-8 overflow-x-auto md:mt-8 mt-6 md:mb-4 mb-4 my-4 md:mx-[3rem] mx-5">
      <div className="flex items-center md:gap-12 gap-8 overflowx-x-auto">
        {!isLoadingCategory && allCategory.length > 0 && (
          <>
            <button
              onClick={() => {
                handleSelectCategory(undefined), callback("");
              }}
              className={`${
                !selectedCategory ? "" : "hover:scale-[1.05]"
              } flex flex-col gap-2 items-center transition-all md:pl-4 pl-8`}
            >
              <div
                className={`${
                  !selectedCategory
                    ? "bg-yellow-300 dark:bg-yellow-500"
                    : "hover:bg-yellow-300 dark:hover:bg-yellow-500 border border-slate-300 dark:border-slate-800"
                }   flex flex-col gap-4 md:p-4 p-3 rounded-full`}
              >
                <ReactIcons.VSCIcon.VscAzureDevops
                  size={window.innerWidth > 765 ? 18 : 15}
                  className="dark:text-white"
                />
              </div>
              <h3 className="text-sm text-nowrap font-bold dark:text-white">
                <CTranslateTo eng="All" pt="Todas" />
              </h3>
            </button>
            {allCategory.map((category, i) => {
              return (
                <button
                  onClick={() => {
                    callback(category.id), handleSelectCategory(category);
                  }}
                  key={i}
                  className={`${
                    selectedCategory?.id === category.id
                      ? ""
                      : "hover:scale-[1.05]"
                  } flex flex-col gap-2 items-center transition-all`}
                >
                  <div
                    className={`${
                      selectedCategory?.id === category.id
                        ? "bg-yellow-300 dark:bg-yellow-500"
                        : "hover:bg-yellow-300 dark:hover:bg-yellow-500 border border-slate-300 dark:border-slate-800"
                    }  flex flex-col gap-4 md:p-4 p-3 rounded-full `}
                  >
                    <ReactIcons.VSCIcon.VscAzureDevops
                      size={window.innerWidth > 765 ? 18 : 15}
                      className="dark:text-white"
                    />
                  </div>
                  <h3 className="text-sm text-nowrap font-bold dark:text-white">
                    {category.name}
                  </h3>
                </button>
              );
            })}
          </>
        )}

        {isLoadingCategory && (
          <>
            {Array.from({ length: 7 }).map((_, i) => {
              return (
                <button
                  key={i}
                  className="flex p-5 animate-pulse rounded-full bg-slate-200 dark:bg-ausoft-slate-900 flex-col gap-2 items-center hover:scale-[1.05] transition-all"
                ></button>
              );
            })}
          </>
        )}
      </div>
    </BaseBox>
  );
}
