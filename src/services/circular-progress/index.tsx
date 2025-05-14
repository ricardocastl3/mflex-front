import { useAppProvider } from "@/providers/app/AppProvider";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { yellow, slate } from "tailwindcss/colors";

import "react-circular-progressbar/dist/styles.css";

export default function CircularProgress({
  percentage,
}: {
  percentage: number;
}) {
  const { isDarkMode } = useAppProvider();
  return (
    <CircularProgressbar
      styles={buildStyles({
        pathColor: !isDarkMode ? yellow[500] : yellow[600],
        trailColor: !isDarkMode ? slate[200] : slate[800],
        textColor: !isDarkMode ? yellow[500] : yellow[500],
        textSize: 18,
      })}
      maxValue={59}
      value={percentage}
      text={`${percentage}s`}
    />
  );
}
