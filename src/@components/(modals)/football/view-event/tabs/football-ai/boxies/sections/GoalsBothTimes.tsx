import { useFootballProvider } from "@/providers/features/FootballProvider";
import { IJSONPrediction } from "@/http/interfaces/models/football/IJSONPrediction";

import PredictionCard from "../PredictionCard";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function GoalsBothTimes({
  prediction,
}: {
  prediction: IJSONPrediction;
}) {
  const { selectedFootballTeam } = useFootballProvider();
  return (
    <PredictionCard
      prediction={prediction}
      final={{
        en: prediction.markets.goals_in_both_times.final.en,
        pt: prediction.markets.goals_in_both_times.final.pt,
      }}
      tips={{
        en: prediction.markets.goals_in_both_times.tips.en,
        pt: prediction.markets.goals_in_both_times.tips.pt,
      }}
      t_en="Goals in both halves"
      t_pt="Gols em ambos os tempos"
    >
      <div className="flex flex-col gap-4 divide-y-2 dark:divide-slate-800">
        <div className="grid grid-cols-2 gap-4 items-center pt-2">
          <div className="flex ">
            <h3 className="text-[0.9rem] font-bold dark:text-white">
              <CTranslateTo eng="Yes" pt="Sim" />
            </h3>
          </div>
          <div className="flex ">
            <h3 className="font-bold">
              {prediction.markets.goals_in_both_times.yes}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center pt-2">
          <div className="flex ">
            <h3 className="text-[0.9rem] font-bold dark:text-white">
              <CTranslateTo eng="No" pt="Não" />
            </h3>
          </div>
          <div className="flex">
            <h3 className="font-bold text-[0.9rem]">
              {prediction.markets.goals_in_both_times.no}
            </h3>
          </div>
        </div>
      </div>
    </PredictionCard>
  );
}
