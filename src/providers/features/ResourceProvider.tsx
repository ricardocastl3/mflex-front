"use client";

import { IMusic } from "@/http/interfaces/models/artists/IMusic";
import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
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
  | ICreatorPost
  | undefined;

export type TSelectedResourceType =
  | "news"
  | "event"
  | "podcast"
  | "music"
  | "movie"
  | "post"
  | undefined;

interface IResourceProviderProps {
  selectedResource: ResourceType;
  selectedResourceType: TSelectedResourceType;
  fetchResource: boolean;

  handleFetchResource: (mode: boolean) => void;
  handleSelectResource: (event: ResourceType) => void;
  handleSelectResourceType: (type: TSelectedResourceType) => void;
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
  const [selectedResourceType, setSelectedResourceType] =
    useState<TSelectedResourceType>();

  const [fetchResource, setFetchResource] = useState(false);

  function handleFetchResource(mode: boolean) {
    setFetchResource(mode);
  }

  function handleSelectResource(resource: ResourceType) {
    setSelectedResource(resource);
  }

  function handleSelectResourceType(type: TSelectedResourceType) {
    setSelectedResourceType(type);
  }

  return (
    <EventContext.Provider
      value={{
        handleSelectResource,
        handleSelectResourceType,

        selectedResourceType,
        selectedResource,
        fetchResource,
        handleFetchResource,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
