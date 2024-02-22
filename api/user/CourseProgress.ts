export const fetchCoursesProgress = async (
  id: string,
  courseId: string,
  topicId: string,
  sequentialTopic:string,
  lessonId: string,
  videoId: string
) => {
    try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/courseProgress
            `,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          courseId: courseId,
          topicId: topicId,
          sequentialTopic:sequentialTopic,
          lessonId: lessonId,
          videoId: videoId,
          viewVideo: true,
        }),
      }
    );

    if (response.ok) {
      console.log("Video information sent successfully");
    } else {
      console.error("Error sending video information");
    }
  } catch (error) {
    console.error("Error when making fetch request:", error);
  }
};
