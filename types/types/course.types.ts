export interface Course {
  _id: string;
  mandatory: boolean;
  courseName: string;
  topicName: string;
  topics: Array<{
    topicName: string;
    _id: string;
    sequentialTopic: string;
    lessons: Array<{
      videoId: string;
      videoName: string;
      description: string;
      videoUrl: string;
      length: string;
      videoUrlHls: string;
      rating: number;
      sequentialLesson: string;
      typeLesson:string;
      _id: string;
    }>;
  }>;
}
