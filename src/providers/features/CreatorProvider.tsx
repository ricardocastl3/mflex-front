"use client";

import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { createContext, ReactNode, useContext, useState } from "react";

interface ICreatorProviderProps {
  selectedCreatorPost: ICreatorPost | undefined;
  fetchCreatorPost: boolean;

  handleFetchCreatorPosts: (mode: boolean) => void;
  handleSelectCreatorPost: (post: ICreatorPost | undefined) => void;
}

export const CreatorContext = createContext({} as ICreatorProviderProps);

export function useCreatorProvider() {
  const context = useContext(CreatorContext);
  return context;
}

export default function CreatorProvider({ children }: { children: ReactNode }) {
  const [selectedCreatorPost, setSelectedCreatorPost] = useState<
    ICreatorPost | undefined
  >();

  const [fetchCreatorPost, setFetchCreatorPost] = useState(false);

  function handleFetchCreatorPosts(mode: boolean) {
    setFetchCreatorPost(mode);
  }

  function handleSelectCreatorPost(post: ICreatorPost | undefined) {
    setSelectedCreatorPost(post);
  }

  return (
    <CreatorContext.Provider
      value={{
        fetchCreatorPost,
        handleFetchCreatorPosts,
        handleSelectCreatorPost,
        selectedCreatorPost,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
}
