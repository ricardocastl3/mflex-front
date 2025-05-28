import { useAuth } from "@/providers/auth/AuthProvider";

import NoSubscription from "./NoSubscription";
import PredictionBox from "./cmps/PredictionBox";

export default function TabFootballAI() {
  const { currentSubscription } = useAuth();

  const isExpired =
    !currentSubscription ||
    (currentSubscription && currentSubscription.subscription.is_expired)
      ? true
      : false;

  return (
    <div className="flex flex-col gap-4 w-full h-full animate-fade">
      <div>{isExpired && <NoSubscription />}</div>
      <div>{!isExpired && <PredictionBox />}</div>
    </div>
  );
}
