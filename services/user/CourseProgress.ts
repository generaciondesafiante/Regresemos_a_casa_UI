export const fetchCoursesProgress = async (
  userId: string,
  courseId: string,
  topicId: string,
  resourceId: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/courseProgress`,
      {
        method: "POST",
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
    console.log(response);
    if (response.ok) {
      console.log("Video information sent successfully");
    } else {
      console.error("Error sending video information");
    }
  } catch (error) {
    console.error("Error when making fetch request:", error);
  }
};
