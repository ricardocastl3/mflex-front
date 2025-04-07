import CTranslateTo from "@/@components/(translation)/CTranslateTo";

interface IContentItem {
  description_pt: string;
  description_en: string;
  title_pt: string;
  title_en: string;
  section_id: string;
  position: number;
}

export default function PolicyContentItem({
  description_en,
  description_pt,
  title_en,
  title_pt,
  section_id,
  position,
}: IContentItem) {
  return (
    <section id={`${section_id}`}>
      <h4 className="text-xl dark:text-white">
        {`${position}. `}
        <CTranslateTo eng={title_en} pt={title_pt} />
      </h4>
      <h5 className="text-md text-slate-600 dark:text-slate-400">
        {<CTranslateTo eng={description_en} pt={description_pt} />}
      </h5>
    </section>
  );
}
