import { z } from "zod";


export const schema = z.object({
  nameTopic: z.string().min(2, "El nombre del tema debe tener al menos 2 caracteres es obligatorio"),
});

export type FormData = z.infer<typeof schema>;
