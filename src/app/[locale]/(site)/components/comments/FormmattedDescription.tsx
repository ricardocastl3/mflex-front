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
          <p key={idx} className="dark:text-white text-[0.9rem]">
            {line
              .split(/(#[\w-]+)|(https?:\/\/[^\s]+)|(www\.[^\s]+)/g)
              .map((part, i) => {
                if (!part) return null;
                if (part.match(/^#[\w-]+$/)) {
                  return (
                    <span
                      key={i}
                      className="cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-600 text-yellow-500 font-semibold"
                    >
                      {part}
                    </span>
                  );
                } else if (part.match(/^(https?:\/\/[^\s]+|www\.[^\s]+)/)) {
                  const url = part.startsWith("http")
                    ? part
                    : `https://${part}`;
                  return (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline break-all"
                    >
                      {part}
                    </a>
                  );
                } else {
                  return <span key={i}>{part}</span>;
                }
              })}
          </p>
        ) : (
          <p key={idx} className="dark:text-white text-[0.9rem]">
            {line}
          </p>
        )
      )}
    </>
  );
}
