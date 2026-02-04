import { z } from "zod";

export const RegisterValidation = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    confirmEmail: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails must match",
    path: ["confirmEmail"],
  });

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});
