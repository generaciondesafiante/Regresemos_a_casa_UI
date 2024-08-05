export interface Resource {
  _id: {
    _id: string;
    resourceUrl: string;
    title: string;
    description: string;
    typeResource: "video" | "audio" | "image" | "pdf" | "link"; // puedes ajustar esto según los tipos de recursos
    visibility: "public" | "private" | "restrictedIncourse"; // Ajusta según los tipos de visibilidad
    miniaturaUrl: string;
    createdAt: string; // Considera usar Date en lugar de string si es posible
    updatedAt: string; // Considera usar Date en lugar de string si es posible
    __v: number;
  };
  isCompleted?: boolean; // Este campo es opcional
}
