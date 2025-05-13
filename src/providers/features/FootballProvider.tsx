import { IFixture } from "@/http/interfaces/models/football/IFixtures";
import { IFootballLeague } from "@/http/interfaces/models/football/IFootballLeague";
import { IFootballAPITeam } from "@/http/interfaces/models/football/IFootballAPITeam";
import React, { createContext, useContext, useState } from "react";

interface IFootballContextProps {
  selectedFootballTeam: IFixture | undefined;
  selectedFootballAPITeam: IFootballAPITeam | undefined;
  selectedFootballAPILeague: IFootballLeague | undefined;

  handleSelectedFootballAPILeague: (
    league: IFootballLeague | undefined
  ) => void;
  handleSelectedFootballAPITeam: (team: IFootballAPITeam | undefined) => void;
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

  const [selectedFootballAPITeam, setSelectedFootballAPITeam] = useState<
    IFootballAPITeam | undefined
  >();

  const [selectedFootballAPILeague, setSelectedFootballAPILeague] = useState<
    IFootballLeague | undefined
  >();

  function handleSelectFootballTeam(team: IFixture | undefined) {
    setSelectedFootballTeam(team);
  }

  function handleSelectedFootballAPITeam(team: IFootballAPITeam | undefined) {
    setSelectedFootballAPITeam(team);
  }

  function handleSelectedFootballAPILeague(
    league: IFootballLeague | undefined
  ) {
    setSelectedFootballAPILeague(league);
  }

  return (
    <FootballContext.Provider
      value={{
        handleSelectFootballTeam,
        handleSelectedFootballAPITeam,
        handleSelectedFootballAPILeague,

        selectedFootballAPILeague,
        selectedFootballAPITeam,
        selectedFootballTeam,
      }}
    >
      {children}
    </FootballContext.Provider>
  );
}
