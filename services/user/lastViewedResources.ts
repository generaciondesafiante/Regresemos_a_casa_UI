export const fetchLastViewedVideos = async (
  userId: string,
  courseId: string,
  topicId: string,
  resourceId: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/lastViewedResource`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          courseId,
          topicId,
          resourceId,
        }),
      }
    );

    if (!response.ok) {
      console.error(
        "Error al realizar la solicitud fetch:",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error al realizar la solicitud fetch:", error);
  }
};
