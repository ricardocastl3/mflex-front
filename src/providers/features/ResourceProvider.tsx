"use client";

import { IMusic } from "@/http/interfaces/models/artists/IMusic";
import { INews } from "@/http/interfaces/models/INews";
import { IPodcast } from "@/http/interfaces/models/IPodCast";
import { IEvent } from "@/http/interfaces/models/organizer/IEvent";
import { ITVChannel } from "@/http/interfaces/models/tv/ITVChannel";
import { ITVMovie } from "@/http/interfaces/models/tv/ITVMovie";
import { createContext, ReactNode, useContext, useState } from "react";

export type ResourceType =
  | IEvent
  | INews
  | IPodcast
  | IMusic
  | ITVChannel
  | ITVMovie
  | undefined;

interface IResourceProviderProps {
  selectedResource: ResourceType;
  fetchResource: boolean;

  handleFetchResource: (mode: boolean) => void;
  handleSelectResource: (event: ResourceType) => void;
}

export const EventContext = createContext({} as IResourceProviderProps);

export function useResourceProvider() {
  const context = useContext(EventContext);
  return context;
}

export default function ResourceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedResource, setSelectedResource] = useState<ResourceType>();

  const [fetchResource, setFetchResource] = useState(true);

  function handleFetchResource(mode: boolean) {
    setFetchResource(mode);
  }

  function handleSelectResource(resource: ResourceType) {
    setSelectedResource(resource);
  }

  return (
    <EventContext.Provider
      value={{
        handleSelectResource,
        selectedResource,
        fetchResource,
        handleFetchResource,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
