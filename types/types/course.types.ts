export interface Course {
  _id: string;
  mandatory: boolean;
  courseName: string;
  topicName: string;
  topics: Array<{
    topicName: string;
    sequentialTopic: string;
    lessons: Array<{
      videoId: string;
      videoName: string;
      description: string;
      videoUrl: string;
      length:string;
      videoUrlHls:string;
      rating: number;
    }>;
  }>;
};


