"use client";

import { IResourceComment } from "@/http/interfaces/models/resources/IResourceComment";
import { createContext, ReactNode, useContext, useState } from "react";

interface IResourceCommentProviderProps {
  selectedComment: IResourceComment | undefined;
  fetchComment: boolean;

  handleFetchComment: (mode: boolean) => void;
  handleSelectComment: (comment: IResourceComment | undefined) => void;
}

export const CommentContext = createContext(
  {} as IResourceCommentProviderProps
);

export function useCommentProvider() {
  const context = useContext(CommentContext);
  return context;
}

export default function CommentProvider({ children }: { children: ReactNode }) {
  const [selectedComment, setSelectedComment] = useState<
    IResourceComment | undefined
  >();

  const [fetchComment, setFetchComment] = useState(false);

  function handleFetchComment(mode: boolean) {
    setFetchComment(mode);
  }

  function handleSelectComment(comment: IResourceComment | undefined) {
    setSelectedComment(comment);
  }

  return (
    <CommentContext.Provider
      value={{
        handleSelectComment,
        selectedComment,
        fetchComment,
        handleFetchComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}
