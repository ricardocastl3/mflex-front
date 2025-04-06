import { z } from "zod";

class signUpSchema {
  signUpSchema;
  constructor(lang: string) {
    this.signUpSchema = z
      .object({
        first_name: z
          .string({
            required_error:
              lang == "en" ? "First name is required" : "Nome é obrigatório",
          })
          .min(2, {
            message:
              lang == "en"
                ? "First name must be at least 2 characters"
                : "Nome deve ter pelo menos 2 caracteres",
          }),

        last_name: z
          .string({
            required_error:
              lang == "en"
                ? "Last name is required"
                : "Sobrenome é obrigatório",
          })
          .min(2, {
            message:
              lang == "en"
                ? "Last name must be at least 2 characters"
                : "Sobrenome deve ter pelo menos 2 caracteres",
          }),

        phone: z
          .string({
            required_error:
              lang == "en"
                ? "Phone number is required"
                : "Número de celular é obrigatório",
          })
          .min(9, {
            message:
              lang == "en"
                ? "Enter a valid phone number"
                : "Informe um número de celular válido",
          }),

        password: z
          .string({
            required_error:
              lang == "en" ? "Password is required" : "Senha é obrigatória",
          })
          .min(6, {
            message:
              lang == "en"
                ? "Password must be at least 6 characters"
                : "Senha deve ter pelo menos 6 caracteres",
          }),

        confirmPassword: z.string({
          required_error:
            lang == "en"
              ? "Password confirmation is required"
              : "Confirmação de senha é obrigatória",
        }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message:
          lang == "en" ? "Passwords don't match" : "As senhas não coincidem",
        path: ["confirmPassword"], // path do erro
      });
  }
}
export default signUpSchema;
