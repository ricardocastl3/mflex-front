import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { useAuth } from "@/providers/auth/AuthProvider";

export default function TabStats() {
  const { currentSubscription } = useAuth();

  return (
    <div className="flex flex-col gap-4 w-full h-full animate-fade">
      <div>
        <h3 className="dark:text-white text-sm">
          <CTranslateTo
            eng="We are working to bring you the best data 😀"
            pt="Estamos trabalhando para trazer te os melhores dados 😀"
          />
        </h3>
      </div>
    </div>
  );
}
