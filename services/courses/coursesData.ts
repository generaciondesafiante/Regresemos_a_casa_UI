export const fetchCoursesData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL_COURSE_RESOURCES}/course/coursedata`
    );
    const json = await response.json();

    if (json.ok && Array.isArray(json.courses)) {
      return json.courses;
    } else {
      console.error("Invalid courses data:", json.courses);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
