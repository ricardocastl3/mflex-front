import { useAuth } from "@/providers/auth/AuthProvider";
import Image from "next/image";

export default function AAvatar({
  size,
  wsite,
  src,
}: {
  src?: string;
  size: number;
  wsite: string;
}) {
  const { userLogged } = useAuth();
  return (
    <div className="cursor-pointer p-0.5 bg-gradient-to-tr hover:bg-gradient-to-tl rounded-full from-blue-500 to-orange-400">
      {!userLogged?.photo && (
        <>
          <span
            className={`${wsite} flex items-center justify-center border dark:border-none border-slate-300 rounded-full dark:text-white md:text-lg text-md font-extrabold bg-white dark:bg-slate-800`}
          >
            <h4 className="mt-1.5">
              {userLogged?.first_name?.split("")[0]}
              {userLogged?.last_name?.split("")[0]}
            </h4>
          </span>
        </>
      )}

      {userLogged?.photo && (
        <Image
          width={size}
          height={size}
          src={src ? src : userLogged.photo}
          alt="Logo"
          className="rounded-full"
        />
      )}
    </div>
  );
}
