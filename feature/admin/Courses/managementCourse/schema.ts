// schema.ts
import { z } from "zod";

// Usa el enum para generar el schema
export const typeOfRouteEnum = z.enum(["strict", "flexible"]);

export const schema = z.object({
  nameCourse: z.string().min(2, "El nombre del curso es obligatorio"),
  titleCourse: z.string().min(2, "El título del curso es obligatorio"),
  typeOfRoute: typeOfRouteEnum,
});

export type FormData = z.infer<typeof schema>;
