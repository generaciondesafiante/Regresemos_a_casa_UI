export const fetchLastViewedVideos = async (
  userId: string,
  courseName: string,
  courseId: string,
  videoId: string,
  topicName: string,
  sequentialTopic: string,
  URLVideo: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lastViewedVideos`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          courseName,
          courseId,
          videoId,
          topicName,
          sequentialTopic,
          URLVideo,
          viewVideo: true,
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
