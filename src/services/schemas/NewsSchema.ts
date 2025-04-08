import z from "zod";

class NewsSchemas {
  newsSchema;

  constructor(lang: "en" | "pt" | string) {
    this.newsSchema = z.object({
      title: z
        .string({
          required_error:
            lang === "en" ? "Title is required" : "Título é obrigatório",
        })
        .min(1, {
          message:
            lang === "en"
              ? "Title cannot be empty"
              : "Título não pode estar vazio",
        }),
      content: z
        .string({
          required_error:
            lang === "en" ? "Content is required" : "Conteúdo é obrigatório",
        })
        .min(1, {
          message:
            lang === "en"
              ? "Content cannot be empty"
              : "Conteúdo não pode estar vazio",
        }),
      category_id: z.string().uuid().optional(),
    });
  }
}

export default NewsSchemas;
