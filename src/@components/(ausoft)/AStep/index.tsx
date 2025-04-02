export default function AStep({
  current,
  total,
  done,
}: {
  current: number;
  total: number;
  done: boolean;
}) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: `repeat(${total}, 1fr)` }}
    >
      {Array.from({ length: total }).map((_, i) => {
        return (
          <div key={i} className="flex items-center">
            <span
              className={`${
                done && i == total - 1 && current == i
                  ? "bg-green-600"
                  : i <= current
                  ? "bg-violet-600"
                  : "bg-slate-600"
              } px-[0.68rem] py-1.5 text-xs rounded-full text-white font-bold text-md`}
            >
              {i + 1}
            </span>

            <span
              className={`${i == total - 1 ? "rounded-r-full" : ""} ${
                done && i == total - 1 && current == i
                  ? "bg-green-600"
                  : i <= current
                  ? "bg-violet-600 "
                  : "bg-slate-700"
              } py-0.5 w-full`}
            ></span>
          </div>
        );
      })}
    </div>
  );
}
