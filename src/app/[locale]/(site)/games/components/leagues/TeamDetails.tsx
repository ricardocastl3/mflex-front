export default function TeamDetails({
  logo,
  name,
  score,
}: {
  name: string;
  logo: string;
  score: number;
}) {
  return (
    <div className="flex flex-col gap-2 items-center justify-between">
      <div className="flex flex-col items-center gap-4">
        <img src={logo} alt={name} width={27} height={27} />
        <h1 className="text-sm dark:text-white text-center">{name}</h1>
      </div>
      <b className="text-lg dark:text-white">{score ? score : `-------`}</b>
    </div>
  );
}
