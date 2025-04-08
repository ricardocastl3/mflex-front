import z from "zod";

class CategorySchemas {
  categorySchema;
  constructor(lang: "en" | "pt" | string) {
    this.categorySchema = z.object({
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
      description: z.string({
        required_error:
          lang === "en" ? "Description is required" : "Descrição é obrigatória",
      }),
    });
  }
}

export default CategorySchemas;
