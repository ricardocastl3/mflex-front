import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function NewsPage() {
  return (
    <div>
      <h1 className="dark:text-white">
        <CTranslateTo eng="News" pt="Novidades" />
      </h1>
    </div>
  );
}
