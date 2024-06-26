export interface User {
  ok: boolean;
  uid: string;
  lastname: string;
  name: string;
  email: string;
  city: string;
  country: string;
  phone: string | null;
  image: string;
  admin:boolean;
  CourseProgress: any[]; 
  lastViewedVideos: {
    _id: string;
    courseName: string;
    idCourse: string;
    idVideo: string;
    tema: string;
    indexTopic: string;
    urlVideo: string;
  }[];
}