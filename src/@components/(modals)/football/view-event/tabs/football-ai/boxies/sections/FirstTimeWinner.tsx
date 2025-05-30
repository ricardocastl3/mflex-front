import { useFootballProvider } from "@/providers/features/FootballProvider";
import { IJSONPrediction } from "@/http/interfaces/models/football/IJSONPrediction";

import PredictionCard from "../PredictionCard";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function FirstTimeWinner({
  prediction,
}: {
  prediction: IJSONPrediction;
}) {
  const { selectedFootballTeam } = useFootballProvider();
  return (
    <PredictionCard
      prediction={prediction}
      final={{
        en: prediction.markets.first_time_winner.final.en,
        pt: prediction.markets.first_time_winner.final.pt,
      }}
      tips={{
        en: prediction.markets.first_time_winner.tips.en,
        pt: prediction.markets.first_time_winner.tips.pt,
      }}
      t_en="1st half result"
      t_pt="Resultado do 1º tempo"
    >
      <div className="flex flex-col gap-4 divide-y-2 dark:divide-slate-800">
        <div className="grid grid-cols-2 gap-4 items-center pt-2">
          <div className="flex ">
            <h3 className="text-[0.9rem] font-bold dark:text-white">
              {selectedFootballTeam?.teams.home.name}
            </h3>
          </div>
          <div className="flex ">
            <h3 className="font-bold">{prediction.markets.first_time_winner.home}</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center pt-2">
          <div className="flex ">
            <h3 className="text-[0.9rem] font-bold dark:text-white">
              {selectedFootballTeam?.teams.away.name}
            </h3>
          </div>
          <div className="flex">
            <h3 className="font-bold text-[0.9rem]">
              {prediction.markets.first_time_winner.away}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center pt-2">
          <div className="flex ">
            <h3 className="text-[0.9rem] font-bold dark:text-white">
              <CTranslateTo eng="Draw" pt="Empate" />
            </h3>
          </div>
          <div className="flex ">
            <h3 className="font-bold text-[0.9rem]">
              {prediction.markets.first_time_winner.draw}
            </h3>
          </div>
        </div>
      </div>
    </PredictionCard>
  );
}
