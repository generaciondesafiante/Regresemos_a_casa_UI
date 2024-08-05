export const fetchCoursesData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
