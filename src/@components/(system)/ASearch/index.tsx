import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function FilterFieldsSearchs({
  type,
  setOpenSearchType,
  setViewListType,
}: {
  type: "products" | "webhooks" | "transactions" | "merchants";
  setOpenSearchType?: Dispatch<SetStateAction<boolean>>;
  setViewListType?: Dispatch<SetStateAction<boolean>>;
}) {
  let keyTypeSearch = "";

  switch (type) {
    case "products":
      keyTypeSearch = "products-search-list";
      break;

    case "webhooks":
      keyTypeSearch = "webhooks-search-list";
      break;

    case "transactions":
      keyTypeSearch = "transactions-search-list";
      break;

    case "merchants":
      keyTypeSearch = "merchants-search-list";
      break;
  }

  let keyTypeFilterList = "";

  switch (type) {
    case "products":
      keyTypeFilterList = "products-filter-list";
      break;

    case "webhooks":
      keyTypeFilterList = "webhooks-filter-list";
      break;

    case "transactions":
      keyTypeSearch = "transactions-search-list";
      break;

    case "merchants":
      keyTypeSearch = "merchants-search-list";
      break;
  }

  const [openSearching, setOpenSearching] = useState(() => {
    /*
    if (typeof window != "undefined") {
      const isListViewStorage = localStorage.getItem(keyTypeSearch);
      if (isListViewStorage && isListViewStorage == "true") {
        return true;
      }
    }*/
    return false;
  });

  const [viewItemOnList, setViewItemOnList] = useState(() => {
    if (typeof window != "undefined") {
      const isListViewStorage = localStorage.getItem(keyTypeFilterList);
      if (isListViewStorage && isListViewStorage == "true") {
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem(keyTypeSearch, JSON.stringify(openSearching));
    if (setOpenSearchType) setOpenSearchType(openSearching);
  }, [openSearching]);

  useEffect(() => {
    localStorage.setItem(keyTypeFilterList, JSON.stringify(viewItemOnList));
    if (setViewListType) setViewListType(viewItemOnList);
  }, [viewItemOnList]);

  return (
    <div className="flex items-center gap-2">
      {setViewListType && (
        <div className="md:flex hidden">
          <AuSoftUI.Component.ToolTip
            body={
              <AuSoftUI.UI.Button
                size={"sm"}
                onClick={() => setViewItemOnList((state) => !state)}
                className="py-1.5 px-1.5 gap-1 rounded-full justify-center"
                variant={viewItemOnList ? "primary" : "outline"}
              >
                {viewItemOnList && <ReactIcons.PiIcon.PiList size={15} />}
                {!viewItemOnList && <ReactIcons.RxIcon.RxGrid size={15} />}
              </AuSoftUI.UI.Button>
            }
            description_en={`${
              viewItemOnList
                ? "List format view. Click to view in grid format"
                : "Grid view. Click to view in list format"
            }`}
            description_pt={`${
              viewItemOnList
                ? "Visualização em formato de lista. Clique para visualizar em formato de grade"
                : "Visualização em formato de grade. Clique para visualizar em formato de lista"
            }`}
          />
        </div>
      )}
      {setOpenSearchType && (
        <AuSoftUI.Component.ToolTip
          width="w-fit"
          body={
            <AuSoftUI.UI.Button
              size={"sm"}
              onClick={() => setOpenSearching((state) => !state)}
              className="md:py-1.5 py-2.5 md:px-1.5 px-2.5  gap-1 rounded-full justify-center"
              variant={openSearching ? "primary" : "outline"}
            >
              <ReactIcons.AiICon.AiOutlineSearch size={15} />
            </AuSoftUI.UI.Button>
          }
          description_en="View search field"
          description_pt="Ver Campo de Busca"
        />
      )}
    </div>
  );
}
