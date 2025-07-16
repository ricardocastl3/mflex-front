"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";
import { useAuth } from "./AuthProvider";

interface ISocketProviderProps {
  socketEvent: ISocketEvent | undefined;
}

interface ISocketEvent {
  name: "reference-pay" | "new-app-version" | "new-notify" | "";
  user_id: string;
  metadata?: any;
}

export const socketClient = io(process.env.MFLEX_SERVER_URL);

export const SocketProviderContext = createContext({} as ISocketProviderProps);

export function useSocketProvider() {
  const context = useContext(SocketProviderContext);
  return context;
}

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socketEvent, setSocketEvent] = useState<ISocketEvent>({
    user_id: "",
    name: "",
  });

  const { userLogged } = useAuth();

  useEffect(() => {
    let userId = "";
    if (userLogged?.id) {
      userId = userLogged.id;
    } else {
      userId = uuid();
    }

    socketClient.emit("k", userId);

    setSocketEvent((state) => ({ ...state, user_id: userId }));
    socketClient.on("reference-pay", (data) => {
      setSocketEvent((state) => ({ ...state, name: "reference-pay" }));
    });

    socketClient.on("new-app-version", (data) => {
      setSocketEvent((state) => ({ ...state, name: "new-app-version" }));
    });

    socketClient.on("new-notify", (data) => {
      setSocketEvent((state) => ({ ...state, name: "new-notify" }));
    });
  }, [socketClient, userLogged]);

  return (
    <SocketProviderContext.Provider value={{ socketEvent }}>
      {children}
    </SocketProviderContext.Provider>
  );
}
