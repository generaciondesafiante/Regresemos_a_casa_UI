export interface VideoLesson {
  videoId: string;
  videoName: string;
  description: string;
  videoUrl: string;
  length: string;
  videoUrlHls: string;
  rating: number;
  _id?: string;
  sequentialLesson?: string
  typeLesson: string

}
interface Option {
  textAnswer: string;
  isCorrect: boolean;
}
export interface Question {
  title: string;
  image: string;
  questionType: string;
  options: Option[];
}
export interface AssessmentLesson {
  sequentialLesson: string;
  typeLesson: string;
  options: Option[];
  quetions: Question,
  _id?: string;
  videoUrl?: string;
  videoId?: string;
  description?: string;
  videoName?: string;
  

}