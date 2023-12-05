
export interface Course {
_id: string;
  name: string;
  endpoint: string;
  content: {
    title: string;
    description: string;
    url: string;
    idVideo: number;
  }[];
  id: number;
}