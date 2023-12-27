export interface Course {
  _id: string;
  courseName: string;
  topicName: string;
  topics: Array<{
    topicName: string;
    lessons: Array<{
      videoId: string;
      videoName: string;
      description: string;
      videoUrl: string;
      rating: number;
    }>;
  }>;
};


