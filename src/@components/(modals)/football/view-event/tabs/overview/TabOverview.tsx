import { useAuth } from "@/providers/auth/AuthProvider";

export default function TabOverview() {
  const { currentSubscription } = useAuth();

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div>
        <h3>VIEW</h3>
      </div>
    </div>
  );
}
