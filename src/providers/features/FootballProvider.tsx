import { IFixture } from "@/http/interfaces/models/IFixtures";
import React, { createContext, useContext, useState } from "react";

interface IFootballContextProps {
  selectedFootballTeam: IFixture | undefined;

  handleSelectFootballTeam: (team: IFixture | undefined) => void;
}

const FootballContext = createContext({} as IFootballContextProps);

export function useFootballProvider() {
  const context = useContext(FootballContext);
  return context;
}

export default function FootballProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedFootballTeam, setSelectedFootballTeam] = useState<
    IFixture | undefined
  >();

  function handleSelectFootballTeam(team: IFixture | undefined) {
    setSelectedFootballTeam(team);
  }

  return (
    <FootballContext.Provider
      value={{ handleSelectFootballTeam, selectedFootballTeam }}
    >
      {children}
    </FootballContext.Provider>
  );
}
