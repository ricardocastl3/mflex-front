import { ReactIcons } from "@/utils/icons";

export default function AIsSubmitting({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <>
      {isSubmitting && (
        <ReactIcons.CgIcon.CgSpinnerTwo size={21} className="animate-spin" />
      )}
    </>
  );
}
