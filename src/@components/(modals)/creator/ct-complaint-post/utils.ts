export interface IPostComplaintTitles {
  t_pt: string;
  t_en: string;
  value: string;
}

export const complaintPosts: IPostComplaintTitles[] = [
  {
    t_en: "This post is fake",
    t_pt: "Esta publicação é falsa",
    value: "fake_post",
  },
  {
    t_en: "Inappropriate content",
    t_pt: "Conteúdo inapropriado",
    value: "inappropriate_content",
  },
  {
    t_en: "Copyright violation",
    t_pt: "Violação de direitos autorais",
    value: "copyright_violation",
  },
  {
    t_en: "Spam or misleading",
    t_pt: "Spam ou enganoso",
    value: "spam_misleading",
  },
  {
    t_en: "Hate speech or discrimination",
    t_pt: "Discurso de ódio ou discriminação",
    value: "hate_speech",
  },
  {
    t_en: "Violence or harmful content",
    t_pt: "Violência ou conteúdo prejudicial",
    value: "violence_content",
  },
  {
    t_en: "Identity theft",
    t_pt: "Roubo de identidade",
    value: "identity_theft",
  },
  {
    t_en: "Misinformation",
    t_pt: "Desinformação",
    value: "misinformation",
  },
];
