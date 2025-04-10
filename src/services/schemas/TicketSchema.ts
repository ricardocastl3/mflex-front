// api/src/services/schemas/TicketSchema.ts
import z from "zod";

class TicketSchemas {
  ticketSchema;
  constructor(lang: "en" | "pt" | string) {
    this.ticketSchema = z.object({
      amount: z.number({
        message:
          lang === "en" ? "Amount is required" : "Montante é obrigatório",
      }),
      name: z
        .string({
          message: lang === "en" ? "Name is required" : "Nome é obrigatório",
        })
        .min(1, {
          message:
            lang === "en"
              ? "Name cannot be empty"
              : "Nome não pode estar vazio",
        }),
      description: z.string().optional(),
    });
  }
}

export default TicketSchemas;
