import { Resource } from "./Resources";

export interface User {
  ok: boolean;
  uid: string;
  lastname: string;
  name: string;
  email: string;
  city: string;
  country: string;
  phone: number | null; // Cambiado de string a number, ya que el ejemplo tiene un número
  image: string;
  admin: boolean;
  CourseProgress: CourseProgress[];
  lastViewedVideos: LastViewedVideo[];
}

export interface CourseProgress {
  _id: string; // Agregado para el ID del progreso del curso
  course: string; // ID del curso
  lastViewedTopic: {
    topic: TopicProgress[];
  };
}

export interface TopicProgress {
  _id: string; // ID del tema
  topicId: string; // ID del tema
  lastViewedResource: Resource;
}

export interface LastViewedVideo {
  _id: string; // ID del video
  courseName: string; // Nombre del curso
  courseId: string; // ID del curso
  videoId: string; // ID del video
  topicName: string; // Nombre del tema
  sequentialTopic: string; // Número secuencial del tema
  URLVideo: string; // URL del video
}
