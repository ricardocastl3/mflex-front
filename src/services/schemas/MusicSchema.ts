import z from "zod";

class MusicSchemas {
  musicSchema;
  constructor(lang: "en" | "pt" | string) {
    this.musicSchema = z.object({
      title: z
        .string({
          message: lang === "en" ? "Title is required" : "Título é obrigatório",
        })
        .min(1, {
          message:
            lang === "en"
              ? "Title cannot be empty"
              : "Título não pode estar vazio",
        }),

      description: z.string({
        message:
          lang === "en" ? "Description is required" : "Descrição é obrigatória",
      }),
    });
  }
}

export default MusicSchemas;
