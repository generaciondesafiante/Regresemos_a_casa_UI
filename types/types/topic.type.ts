export interface Topic {
    topicName: string;
    lessons: Array<{
        videoId: string;
        videoName: string;
        description: string;
        videoUrl: string;
        length:string;
      videoUrlHls:string;

        rating: number;
    }>;

}