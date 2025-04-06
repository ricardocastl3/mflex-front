import z from "zod";

class AuthSchemas {
  loginSchema;

  constructor(lang: "en" | "pt" | string) {
    this.loginSchema = z.object({
      phone: z
        .string({
          message:
            lang == "en"
              ? "Entering a valid phone number"
              : "Informe um número de celular válido",
        })
        .min(9, {
          message:
            lang == "en"
              ? "Entering a valid phone number"
              : "Informe um número de celular válido",
        }),
      password: z.string(),
    });
  }
}

export default AuthSchemas;
