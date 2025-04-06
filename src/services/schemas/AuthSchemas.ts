import z from "zod";

class AuthSchemas {
  loginSchema;
  confirmCodeSchema;

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
    this.confirmCodeSchema = z.object({
      code: z
        .string({
          message: lang == "en" ? "Enter the code" : "Informe o código",
        })
        .min(2, {
          message: lang == "en" ? "Enter the code" : "Informe o código",
        }),
    });
  }
}

export default AuthSchemas;
