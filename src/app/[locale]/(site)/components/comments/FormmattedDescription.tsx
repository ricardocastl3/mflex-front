export default function FormmattedDescription({
  description,
  type,
}: {
  description: string;
  type: "comment" | "post";
}) {
  return (
    <>
      {description.split(/\n/).map((line, idx) =>
        type === "post" ? (
          <p key={idx} className="dark:text-white text-sm">
            {line.split(/(#[\w-]+)/g).map((part, i) =>
              part.match(/^#[\w-]+$/) ? (
                <span
                  key={i}
                  className="cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-600 text-yellow-500 font-semibold"
                >
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        ) : (
          <p key={idx} className="dark:text-white text-sm">
            {line}
          </p>
        )
      )}
    </>
  );
}
