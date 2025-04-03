import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function News() {
  return (
    <div className="flex flex-col gap-4 md:py-8 py-5">
      <div>
        <h4 className="text-lg dark:text-white">
          <CTranslateTo eng="The Big News 🔥" pt="As Grandes Novidades 🔥" />
        </h4>
      </div>
    </div>
  );
}
