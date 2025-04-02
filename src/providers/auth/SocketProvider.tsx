import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";

interface ISocketProviderProps {
  socketEvent: ISocketEvent | undefined;
}

interface ISocketEvent {
  name: "reference-pay" | "";
  metadata: string;
}

const socketClient = io(process.env.LINKS_SERVER_URL);

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
    metadata: "",
    name: "",
  });

  useEffect(() => {
    const userId = uuid();
    socketClient.emit("hi", userId);

    setSocketEvent((state) => ({ ...state, metadata: userId }));
    socketClient.on("reference-pay", (data) => {
      setSocketEvent((state) => ({ ...state, name: "reference-pay" }));
    });
  }, []);

  return (
    <SocketProviderContext.Provider value={{ socketEvent }}>
      {children}
    </SocketProviderContext.Provider>
  );
}
