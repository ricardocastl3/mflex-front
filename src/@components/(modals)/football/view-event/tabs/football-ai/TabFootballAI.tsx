import { useAuth } from "@/providers/auth/AuthProvider";

import NoSubscription from "./NoSubscription";
import PredictionBox from "./boxies/PredictionBox";

export default function TabFootballAI() {
  const { currentSubscription } = useAuth();

  const isExpired =
    !currentSubscription ||
    (currentSubscription &&
      (currentSubscription.subscription.is_expired ||
        Number(currentSubscription.football_ai) <= 0))
      ? true
      : false;

  return (
    <div className="flex flex-col gap-4 w-full h-full animate-fade">
      <div>{isExpired && <NoSubscription />}</div>
      <div>{!isExpired && <PredictionBox />}</div>
    </div>
  );
}
