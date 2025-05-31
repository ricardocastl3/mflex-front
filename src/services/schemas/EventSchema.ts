import z from "zod";

class EventSchemas {
  eventSchema;
  constructor(lang: "en" | "pt" | string) {
    this.eventSchema = z.object({
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

      description: z
        .string({
          required_error:
            lang === "en"
              ? "Description is required"
              : "Descrição é obrigatória",
        })
        .min(10, {
          message:
            lang === "en"
              ? "The description cannot be empty"
              : "A descrição não pode estar vazio",
        }),
      map_location: z
        .string({
          required_error:
            lang === "en"
              ? "Map location is required"
              : "Localização no mapa é obrigatória",
        })
        .min(1, {
          message:
            lang === "en"
              ? "Map Location cannot be empty"
              : "Localização no mapa não pode estar vazio",
        }),
      start_at: z.date({
        message: lang === "en" ? "Invalid Date" : "Data inválida",
        invalid_type_error: lang === "en" ? "Invalid Date" : "Data inválida",
        required_error:
          lang === "en"
            ? "Start date is required"
            : "Data de início é obrigatória",
      }),

      reference_address: z
        .string({
          required_error:
            lang === "en"
              ? "Reference address is required"
              : "Endereço de referência é obrigatório",
        })
        .min(1, {
          message:
            lang === "en"
              ? "Reference address cannot be empty"
              : "Endereço de referência não pode estar vazio",
        }),
      affiliate: z.string().nullish(),
    });
  }
}

export default EventSchemas;
