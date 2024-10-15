export const updateCourse = async (
  nameCourse: string,
  titleCourse: string,
  typeOfRoute: string,
  userId: string,
  courseId: string
) => {
  try {



    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${userId}/updateInfoCourse/${courseId}`,

      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameCourse,
          titleCourse,
          typeOfRoute,
        }),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      return {
        status: response.status,
        data: responseData,
      };
    }

    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        data: { message: error.message || "Error desconocido" },
      };
    } else {
      return {
        status: "error",
        data: { message: "Error desconocido" },
      };
    }
  }
};
