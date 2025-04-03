import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function NewsPage() {
  return (
    <div className="md:h-[50vh] h-[40vh] md:pt-[12rem] pt-24 bg-slate-500 md:px-4 px-4">
      <h1 className="dark:text-white">
        <CTranslateTo eng="News" pt="Novidades" />
      </h1>
    </div>
  );
}
