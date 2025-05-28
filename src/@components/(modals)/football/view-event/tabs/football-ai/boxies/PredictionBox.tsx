import { useAppProvider } from "@/providers/app/AppProvider";
import { useState } from "react";
import { IJSONPrediction } from "@/http/interfaces/models/football/IJSONPrediction";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useFootballProvider } from "@/providers/features/FootballProvider";
import { ReactIcons } from "@/utils/icons";
import { internalApi } from "@/http/axios/api";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import PercentageChance from "./sections/PercentageChance";
import OverUnder from "./sections/over_under/OverUnder";
import OtherMarkets from "./sections/OtherMarkets";

export default function PredictionBox() {
  const { handleAddToastOnArray } = useAppProvider();
  const { selectedFootballTeam } = useFootballProvider();

  // Controls
  const [isPredicted, setIsPredicted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [predictedJSON, setPredictedJSON] = useState<
    IJSONPrediction | undefined
  >();

  async function handleAnalyze() {
    try {
      setIsSubmitting(true);

      const resp = await internalApi.post<{
        success: boolean;
        result: IJSONPrediction;
      }>("/football/analyze", {
        ft: selectedFootballTeam?.fixture.id,
      });

      setPredictedJSON(resp.data.result);

      setIsPredicted(true);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {!isSubmitting && isPredicted && predictedJSON && (
        <div className="rounded-xl flex flex-col gap-3 md:p-2 p-4 bg-slate-200 dark:bg-slate-800/60">
          <h2 className="text-lg font-bold text-yellow-600 dark:text-yellow-500">
            <CTranslateTo eng="Results:" pt="Resultados:" />
          </h2>

          <PercentageChance prediction={predictedJSON} />
          <OverUnder prediction={predictedJSON} />
          <OtherMarkets prediction={predictedJSON} />
        </div>
      )}

      {isSubmitting && (
        <div className="flex items-center justify-center md:px-4 px-2">
          <div className=" animate-fade flex justify-center flex-col gap-4 items-center text-sm w-full py-8 dark:text-white text-slate-600">
            <ReactIcons.PiIcon.PiSpinner size={35} className="animate-spin" />
            <h4 className="text-[0.9rem]">
              <CTranslateTo
                eng="We are carrying out the operation..."
                pt="Estamos realizando a operação..."
              />
            </h4>
          </div>
        </div>
      )}

      {!isSubmitting && !isPredicted && !predictedJSON && (
        <div className="flex justify-center items-center w-full h-full md:px-8 px-4">
          <div className="flex flex-col gap-2 md:w-[50vw] w-full items-center text-center">
            <div className="text-yellow-500">
              <ReactIcons.FaIcon.FaRobot size={50} />
            </div>
            <h1 className="text-lg text-yellow-500 font-bold">
              <CTranslateTo
                eng="Ready to be amazed 😀"
                pt="Pronto para se surpreender 😀"
              />
            </h1>
            <h1 className="text-base text-slate-600 dark:text-slate-400">
              <CTranslateTo
                eng="Ready to receive tips, and a complete analysis of the game,"
                pt="Pronto para receber dicas, e uma análise completa do jogo, "
              />
              <b className="font-bold">{`${selectedFootballTeam?.teams.home.name} X ${selectedFootballTeam?.teams.away.name}`}</b>
            </h1>
            <h1 className="text-base text-slate-600 dark:text-slate-400">
              <CTranslateTo
                eng="Click the button below to start the analysis"
                pt="Clique no botão abaixo para começar a análise"
              />
            </h1>
            <AuSoftUI.UI.Button
              onClick={handleAnalyze}
              size={"md"}
              variant={"primary"}
              className="mt-2"
            >
              <CTranslateTo eng="Carry out analysis" pt="Realizar Análise" />
            </AuSoftUI.UI.Button>
          </div>
        </div>
      )}
    </div>
  );
}
