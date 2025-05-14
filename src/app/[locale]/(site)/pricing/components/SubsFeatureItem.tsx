import { IPlanFeature } from "@/http/interfaces/models/IPlan";
import { ReactIcons } from "@/utils/icons";

export default function SubsFeatureItem({
  feature,
}: {
  feature: IPlanFeature;
}) {
  return (
    <div className="flex items-center gap-2">
      {!feature.available && (
        <div className="p-1 rounded-full bg-red-200 dark:bg-red-800/30">
          <ReactIcons.PiIcon.PiX size={8} className="text-red-500" />
        </div>
      )}
      {feature.available && (
        <div className="p-1 rounded-full bg-green-200 dark:bg-green-800/30">
          <ReactIcons.AiICon.AiOutlineCheck
            size={8}
            className="text-green-500"
          />{" "}
        </div>
      )}
      <h1 className="text-sm dark:text-slate-200">{feature.name}</h1>
    </div>
  );
}
