import z from "zod";

class PodcastSchemas {
  podcastSchema;

  constructor(lang: "en" | "pt" | string) {
    this.podcastSchema = z.object({
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
      description: z.string({
        required_error:
          lang === "en" ? "Description is required" : "Descrição é obrigatória",
      }),
      duration: z.string({
        required_error:
          lang === "en" ? "Duration is required" : "Duração é obrigatória",
      }),
      source: z.string({
        message:
          lang === "en"
            ? "Enter a valid source"
            : "Informe uma URL de fonte válida",
      }),
      url: z.string({
        message: lang === "en" ? "Enter a valid url" : "Informe uma URL válida",
      }),
      started_at: z.date({
        required_error:
          lang === "en"
            ? "Start date is required"
            : "Data de início é obrigatória",
      }),
      category_id: z.string().uuid().optional(),
      podcaster_id: z.string({
        required_error:
          lang === "en"
            ? "Podcaster ID is required"
            : "ID do podcaster é obrigatório",
      }),
    });
  }
}

export default PodcastSchemas;
