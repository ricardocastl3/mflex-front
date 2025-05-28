export default function OverUnderDetails({
  details,
}: {
  details?: {
    "0.5": string;
    "1": string;
    "1.5": string;
    "2": string;
    "2.5": string;
    "3": string;
    "3.5": string;
    "4": string;
    "4.5": string;
    "5": string;
    "5.5": string;
  };
}) {
  return (
    <div className="flex flex-col divide-y-2  dark:divide-slate-800">
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">0.5</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["0.5"]}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">1</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["1"]}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">1.5</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["1.5"]}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">2</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["2"]}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">2.5</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["2.5"]}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">3</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["3"]}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">3.5</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["3.5"]}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">4</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["4"]}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">4.5</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["4.5"]}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">5</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["5"]}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center p-2">
        <div className="flex ">
          <h3 className="text-[0.9rem] font-bold text-yellow-500 ">5.5</h3>
        </div>
        <div className="flex ">
          <h3 className="font-bold text-[0.9rem]">{details?.["5.5"]}</h3>
        </div>
      </div>
    </div>
  );
}
