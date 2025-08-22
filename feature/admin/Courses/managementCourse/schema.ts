import { z } from "zod";

export const schema = z.object({
  nameCourse: z.string().min(2, "El nombre del curso es obligatorio").min(1),
  titleCourse: z.string().min(2, "El título del curso es obligatorio").min(1),
  typeOfRoute: z.string().min(2, "Selecciona una opción").min(1),
});

type FormData = z.infer<typeof schema>;
export type { FormData };