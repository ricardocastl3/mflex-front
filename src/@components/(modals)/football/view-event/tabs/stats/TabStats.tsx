import { useAuth } from "@/providers/auth/AuthProvider";

export default function TabStats() {
  const { currentSubscription } = useAuth();

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div>
        <h3>STATS</h3>
      </div>
    </div>
  );
}
