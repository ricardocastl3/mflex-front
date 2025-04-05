import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";

export default function BoxCategories() {
  return (
    <BaseBox className="md:w-auto w-[89vw] flex md:py-4 py-4 justify-center md:px-8 px-5 overflow-x-auto md:mt-8 mt-6 md:mb-4 mb-4 my-4 md:mx-[3rem] mx-5">
      <div className="flex items-center gap-8 overflowx-x-auto">
        {Array.from({ length: 7 }).map((_, i) => {
          return (
            <button
              key={i}
              className="flex flex-col gap-2 items-center hover:scale-[1.05] transition-all"
            >
              <div className="border hover:border-yellow-400 dark:hover:border-yellow-600 flex flex-col gap-4 p-4 rounded-full border-slate-300 dark:border-slate-800">
                <ReactIcons.AiICon.AiOutlineShoppingCart
                  size={18}
                  className="dark:text-white"
                />
              </div>
              <h3 className="text-sm text-nowrap font-bold dark:text-white">
                Artes & Teatros
              </h3>
            </button>
          );
        })}
      </div>
    </BaseBox>
  );
}
