import { z } from "zod";

class ProductSchema {
  productSchema;

  constructor(lang: string) {
    this.productSchema = z.object({
      title: z
        .string({
          required_error: lang == "en" ? "Enter the title" : "Informe o título",
        })
        .min(
          4,
          lang == "en"
            ? "The title must have at least 4 characters."
            : "O título precisa ter no mínimo 4 caracteres."
        ),

      webhook_id: z.string().nullish(),

      description: z
        .string({
          required_error:
            lang == "en"
              ? "Enter the english description"
              : "Informe a descrição em inglês",
        })
        .min(
          4,
          lang == "en"
            ? "The description must have at least 8 characters."
            : "A descrição precisa ter no mínimo 8 caracteres."
        ),

      ao_amount: z
        .number({
          invalid_type_error:
            lang == "en" ? "Enter a number" : "Informe um número",
          required_error:
            lang == "en" ? "Enter the AO Money" : "Informe o preço em (AO)",
        })
        .min(1, {
          message:
            lang == "en"
              ? "Enter a minimum amount"
              : "Informe um montante mínimo",
        }),
    });
  }
}

export default ProductSchema;
