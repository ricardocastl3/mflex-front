import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export interface ISearchDataField {
  name?: string;
  email?: string;
  phone?: string;
  mode?: string;
}

export default function SearchDataField({
  fetchAllDatas,
  fetchAllDataByName,
  isTextCenter = false,
}: {
  isTextCenter?: boolean;

  fetchAllDatas: () => Promise<void>;
  fetchAllDataByName: (val: ISearchDataField) => Promise<void>;
}) {
  // Controls
  const [searchName, setSearchName] = useState("");
  const [canSearch, setCanSearch] = useState(false);

  useEffect(() => {
    if (canSearch) {
      const handler = setTimeout(() => {
        if (searchName == "") {
          fetchAllDatas();
        } else {
          fetchAllDataByName({ name: searchName });
        }
        setCanSearch(false);
      }, 200);
      return () => {
        clearTimeout(handler); // Limpa o timeout anterior
      };
    }
  }, [searchName]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <BaseBox
        className={`${
          isTextCenter ? "bg-white" : "bg-slate-100/90"
        } grid md:grid-cols-1 grid-cols-1 w-full gap-4 md:px-4 px-2  rounded-lg  pt-3 pb-3`}
      >
        <div
          className={`${
            isTextCenter ? "items-center md:pb-4 pb-2 pt-1 md:px-0 px-2" : ""
          } flex flex-col gap-2`}
        >
          <h4
            className={`${
              isTextCenter ? "text-base" : "text-normal"
            } font-bold dark:text-white`}
          >
            <CTranslateTo eng="Search for name" pt="Pesquisar pelo nome" />
          </h4>
          <AuSoftUI.UI.TextField.Default
            value={searchName}
            onChange={(e) => {
              if (!canSearch) setCanSearch(true);
              setSearchName(e.target.value);
            }}
            weight={isTextCenter ? "md" : "sm"}
            placeholder="Ex: Lucas...."
            className={`${
              isTextCenter ? "text-center text-[0.9rem]" : ""
            } w-full`}
          />
        </div>
      </BaseBox>
    </motion.div>
  );
}
