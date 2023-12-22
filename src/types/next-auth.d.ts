import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      lastname: string;
      email: string;
      country: string;
      city: string;
      phone: number;
      image: string;
      uid:string
      token:string
      msg:string
    };
  }

  interface Course {
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

interface Lesson {
    videoId: string;
    videoName: string;
    description: string;
    videoUrl: string;
    rating: number;
}

 interface Topic {
    topics: Array<{
        topicName: string;
        lessons: Array<{
            videoId: string;
            videoName: string;
            description: string;
            videoUrl: string;
            rating: number;
        }>;
    }>
}
}
