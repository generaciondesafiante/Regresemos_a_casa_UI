export const deleteTopicWithinCourse = async (
  userId: string,
  courseId: string,
  topicId: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${userId}/${courseId}/topic/${topicId}`,

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
