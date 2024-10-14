export const createTopicOnCourse = async (
  nameTopic: string,
  userId: string,
  idCourse: string
) => {
  try {
    console.log("data SERVISES", { nameTopic, userId, idCourse });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/topics/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: idCourse,
          nameTopic,
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
