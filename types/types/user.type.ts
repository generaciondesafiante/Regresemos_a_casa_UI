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
  admin: boolean;
  CourseProgress: CourseProgress[];
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

export type CourseProgress = {
  course: string;
  topics?: Array<{
    completed: boolean;
    resources: ResourceProgress[];
  }>;
};

type ResourceProgress = {
  viewResource: boolean; // Whether the user has viewed the resource
  // Add other resource progress properties as needed (e.g., completion time)
};
