import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { useProductProvider } from "@/providers/features/ProductProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useProducts from "@/hooks/api/useProducts";

export default function CardBooks() {
  // Contexts
  const { handleOpenModal } = useModal();
  const { allProducts, isLoadingAllProducts } = useProducts({
    route: "product",
  });
  const { handleSelectProduct } = useProductProvider();

  return (
    <BaseBox className="p-4 flex flex-col gap-4">
      <h4 className="text-normal text-slate-600 dark:text-slate-400 flex items-center gap-2">
        <span className="rounded-full p-1 mb-1 bg-yellow-500 text-white">
          <ReactIcons.BiIcon.BiStar size={8} />
        </span>
        <CTranslateTo eng="Products" pt="Produtos" />
      </h4>
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4 w-fit py-0.5 ml-1 dark:text-white rounded-full text-sm">
          {!isLoadingAllProducts && (
            <h4 className="text-2xl font-bold dark:text-white">
              {allProducts.length}
            </h4>
          )}

          {isLoadingAllProducts && (
            <h4 className="font-bold text-xl p-2.5 my-[0.2rem] rounded-full bg-violet-200 dark:bg-blue-800/50 animate-pulse"></h4>
          )}

          <h4 className="mt-0.5 dark:text-slate-400 text-slate-600">
            <CTranslateTo eng="In your total" pt="No seu total " />
          </h4>
        </div>
        <div className="mt-0.5">
          <AuSoftUI.UI.Button
            onClick={() => {
              handleSelectProduct(undefined);
              handleOpenModal("add-product");
            }}
            variant={"default"}
            size={"sm"}
            className="pt-1.5 pb-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-800/20 dark:hover:bg-blue-800/30 dark:text-blue-300"
          >
            <ReactIcons.CgIcon.CgMathPlus
              size={17}
              className="mb-1.5 items-center"
            />
            <h4 className="mt-0.5">
              <CTranslateTo eng="New" pt="Novo" />
            </h4>
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </BaseBox>
  );
}
