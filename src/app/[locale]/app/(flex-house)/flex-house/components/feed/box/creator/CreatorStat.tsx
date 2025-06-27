import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CreatorStat({
  t_en,
  t_pt,
  value,
  color,
}: {
  t_en: string;
  t_pt: string;
  color: string;
  value: number;
}) {
  return (
    <>
      <div
        className={`${color} flex items-center flex-col gap-4 p-2 rounded-xl `}
      >
        <div className={`font-bold flex flex-col gap-1 items-center text-xs`}>
          <span className="font-bold">{value}</span>
          <span className="">
            <CTranslateTo eng={t_en} pt={t_pt} />
          </span>
        </div>
      </div>
    </>
  );
}
