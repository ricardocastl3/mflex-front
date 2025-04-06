import { z } from "zod";

class RecoverPwdSchema {
  recoverPwdSchema;
  constructor(lang: string) {
    this.recoverPwdSchema = z
      .object({
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

        code: z
          .string({
            required_error:
              lang == "en"
                ? "Verification code is required"
                : "Código de verificação é obrigatório",
          })
          .length(6, {
            message:
              lang == "en"
                ? "Code must be 6 digits"
                : "O código deve ter 6 dígitos",
          }),

        password: z
          .string({
            required_error:
              lang == "en"
                ? "New password is required"
                : "Nova senha é obrigatória",
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
        path: ["confirmPassword"],
      });
  }
}

export default RecoverPwdSchema;
