export const deleteCourse = async (userId: string, idCourse: string) => {
  console.log(userId, idCourse);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${userId}/${idCourse}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    console.log(responseData);
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
