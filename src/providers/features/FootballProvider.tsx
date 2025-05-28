import { IFixtureAPI } from "@/http/interfaces/models/football/IFixturesAPI";
import { IFootballLeague } from "@/http/interfaces/models/football/IFootballLeague";
import { IFootballAPITeam } from "@/http/interfaces/models/football/IFootballAPITeam";
import { IJSONPrediction } from "@/http/interfaces/models/football/IJSONPrediction";

import React, { createContext, useContext, useState } from "react";

interface IFootballContextProps {
  selectedFootballTeam: IFixtureAPI | undefined;
  selectedFootballAPITeam: IFootballAPITeam | undefined;
  selectedFootballAPILeague: IFootballLeague | undefined;
  predictedJSON: IJSONPrediction | undefined;

  handlePredictedJSON: (predicted: IJSONPrediction | undefined) => void;
  handleSelectedFootballAPILeague: (
    league: IFootballLeague | undefined
  ) => void;
  handleSelectedFootballAPITeam: (team: IFootballAPITeam | undefined) => void;
  handleSelectFootballTeam: (team: IFixtureAPI | undefined) => void;
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
    IFixtureAPI | undefined
  >();

  const [selectedFootballAPITeam, setSelectedFootballAPITeam] = useState<
    IFootballAPITeam | undefined
  >();

  const [selectedFootballAPILeague, setSelectedFootballAPILeague] = useState<
    IFootballLeague | undefined
  >();
  const [predictedJSON, setPredictedJSON] = useState<
    IJSONPrediction | undefined
  >();

  function handleSelectFootballTeam(team: IFixtureAPI | undefined) {
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

  function handlePredictedJSON(predicted: IJSONPrediction | undefined) {
    setPredictedJSON(predicted);
  }

  return (
    <FootballContext.Provider
      value={{
        handleSelectFootballTeam,
        handleSelectedFootballAPITeam,
        handleSelectedFootballAPILeague,
        handlePredictedJSON,

        predictedJSON,
        selectedFootballAPILeague,
        selectedFootballAPITeam,
        selectedFootballTeam,
      }}
    >
      {children}
    </FootballContext.Provider>
  );
}
