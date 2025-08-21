export interface AdminPanel {
  totalStudents: number;
  totalResources: number;
  admins: {
    totalAdmins: number;
    latestAdmins: {
      id: string;
      name: string;
      email: string;
    }[];
  };
  latestCourses: [
    {
      id: string;
      nameCourse: string;
      titleCourse: string;
      typeOfRoute: string;
    }
  ];
}
