import { useFootballProvider } from "@/providers/features/FootballProvider";
import { IJSONPrediction } from "@/http/interfaces/models/football/IJSONPrediction";

import PredictionCard from "../PredictionCard";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function PercentageChance({
  prediction,
}: {
  prediction: IJSONPrediction;
}) {
  const { selectedFootballTeam } = useFootballProvider();
  return (
    <PredictionCard
      prediction={prediction}
      final={{ en: prediction.winner.final.en, pt: prediction.winner.final.pt }}
      tips={{ en: prediction.winner.tips.en, pt: prediction.winner.tips.pt }}
      t_en="Percentage of chances"
      t_pt="Percentual de chances"
    >
      <div className="flex flex-col gap-4 divide-y-2 dark:divide-slate-800">
        <div className="grid grid-cols-2 gap-4 items-center pt-2">
          <div className="flex ">
            <h3 className="text-[0.9rem] font-bold dark:text-white">
              {selectedFootballTeam?.teams.home.name}
            </h3>
          </div>
          <div className="flex ">
            <h3 className="font-bold">{prediction.winner.home}</h3>
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
              {prediction.winner.away}
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
              {prediction.winner.draw}
            </h3>
          </div>
        </div>
      </div>
    </PredictionCard>
  );
}
