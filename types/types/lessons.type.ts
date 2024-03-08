export interface VideoLesson {
  videoId: string;
  videoName: string;
  description: string;
  videoUrl: string;
  length: string;
  videoUrlHls: string;
  rating: number;
  _id?: string;
  sequentialLesson?:string
  typeLesson:string
}

export interface AssessmentLesson {
    sequentialLesson: string;
    typeLesson: string;
    questions: [];
    _id?: string;
}