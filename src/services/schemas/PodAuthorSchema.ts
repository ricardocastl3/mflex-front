import z from "zod";

class PodcastAuthorSchemas {
  podcastAuthorSchema;

  constructor(lang: "en" | "pt" | string) {
    this.podcastAuthorSchema = z.object({
      name: z
        .string({
          required_error:
            lang === "en" ? "Name is required" : "Nome é obrigatório",
        })
        .min(1, {
          message:
            lang === "en"
              ? "Name cannot be empty"
              : "Nome não pode estar vazio",
        }),
    });
  }
}

export default PodcastAuthorSchemas;
