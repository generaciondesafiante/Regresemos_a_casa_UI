export const updateVideoStatus = async (userId: string, courseId: string, topicId: string, lessonId: string, videoId: string) => {
  console.log(userId);
    try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/updateVideoStatus/${userId}/${courseId}/${topicId}/${lessonId}/${videoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          viewVideo: true,
        }),
      }
    );

    if (!response.ok) {
      console.error("Error al realizar la solicitud fetch:", response.statusText);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud fetch:", error);
  }
};
