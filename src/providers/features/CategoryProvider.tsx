"use client";

import { ICategory } from "@/http/interfaces/models/ICategory";
import { createContext, ReactNode, useContext, useState } from "react";

interface ICategoryProviderProps {
  selectedCategory: ICategory | undefined;
  fetchCategory: boolean;

  handleFetchCategory: (mode: boolean) => void;
  handleSelectCategory: (category: ICategory | undefined) => void;
}

export const CategoryContext = createContext({} as ICategoryProviderProps);

export function useCategoryProvider() {
  const context = useContext(CategoryContext);
  return context;
}

export default function CategoryProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>();

  const [fetchCategory, setFetchCategory] = useState(false);

  function handleFetchCategory(mode: boolean) {
    setFetchCategory(mode);
  }

  function handleSelectCategory(category: ICategory | undefined) {
    setSelectedCategory(category);
  }

  return (
    <CategoryContext.Provider
      value={{
        handleSelectCategory,
        selectedCategory,
        fetchCategory,
        handleFetchCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
