"use client";
import { useEffect, useState } from "react";
import { redirect, useParams, useRouter } from "next/navigation";
import { fetchLastViewedVideos } from "../../../services/user/lastViewedVideos";
import { useAppSelector } from "../../../store/store";
import { LearningPahtVideoComponent } from "./LearningPahtVideoComponent";
import { fetchCoursesProgress } from "../../../services/user/CourseProgress";

export const LearningPathVideo = () => {
  const router = useRouter();
  const { indexVideo } = useParams();
  const [userRating, setUserRating] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [duracionTotal, setDuracionTotal] = useState<number>(0);
  const [enableButton, setEnableButton] = useState(false);
  const [viewVideo, setViewVideo] = useState(false);

  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);

  const selectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );

  const sequentialLesson = selectedLesson?.sequentialLesson
    ? parseInt(selectedLesson.sequentialLesson)
    : 0;

  const user = useAppSelector((state) => state.user.userInfo);
  const courseProgress = user?.CourseProgress;

  const updateLasVideoUser = () => {
    fetchLastViewedVideos(
      user?.uid || "",
      selectedCourse?.courseName || "",
      selectedCourse?._id || "",
      selectedLesson?._id || "",
      selectedTopic?.topicName || "",
      selectedTopic?.sequentialTopic || "",
      selectedLesson?.videoUrl || ""
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoReady(true);
    }, 200);

    return () => setIsVideoReady(false);
  }, [selectedLesson]);

  useEffect(() => {
    if (courseProgress && selectedCourse && selectedTopic && selectedLesson) {
      if (selectedLesson) {
        const courseProgressForCurrentTopic = courseProgress.find(
          (progress: any) => progress.idCourse === selectedCourse._id
        );

        if (courseProgressForCurrentTopic) {
          const sequentialTopicInCourseProgress = parseInt(
            courseProgressForCurrentTopic.topics[0].sequentialTopic
          );
          const sequentialTopicCurrent = parseInt(
            selectedTopic.sequentialTopic
          );

          if (sequentialTopicCurrent < sequentialTopicInCourseProgress) {
            setEnableButton(true);
            return;
          } else if (
            sequentialTopicCurrent === sequentialTopicInCourseProgress
          ) {
            const sequentialLessonUser = parseInt(
              courseProgressForCurrentTopic.topics[0].lessons[0].sequentialLesson.trim()
            );

            if (sequentialLesson < sequentialLessonUser) {
              setEnableButton(true);
              return;
            }
          }
        }
      }
    }
    setEnableButton(false);
  }, [courseProgress, selectedCourse, selectedTopic, selectedLesson]);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const onNextVideoClick = (index: string) => {
    const currentIndexNumber = parseInt(index, 10) - 1;

    if (!isNaN(currentIndexNumber) && selectedTopic && selectedTopic.lessons) {
      if (
        currentIndexNumber >= 0 &&
        currentIndexNumber < selectedTopic.lessons.length
      ) {
        const nextLesson = selectedTopic.lessons[currentIndexNumber];

        router.push(
          `/dashboard/courses/${selectedCourse?.courseName}/${
            selectedCourse?._id
          }/${nextLesson.videoId}/${selectedTopic?.topicName}/${
            currentIndexNumber + 1
          }`
        );
      }
    }
  };

  const handleNextVideo = () => {
    if (Array.isArray(indexVideo)) {
      console.log(indexVideo[0]);
      const firstIndex = indexVideo[0];
      onNextVideoClick(firstIndex);
    } else {
      if (selectedCourse && selectedTopic && selectedLesson) {
        const nextLessonIndex = selectedLesson?.sequentialLesson
          ? parseInt(selectedLesson.sequentialLesson) + 1
          : 0;

        const nextLesson = selectedTopic.lessons.find(
          (lesson: any) => parseInt(lesson.sequentialLesson) === nextLessonIndex
        );

        const isLastLesson =
          nextLessonIndex - 1 === selectedTopic.lessons.length;

        if (isLastLesson) {
          console.log("epa");
          const nextTopicIndex = parseInt(selectedTopic.sequentialTopic) + 1;
          const nextTopic = selectedCourse.topics.find(
            (topic: any) => parseInt(topic.sequentialTopic) === nextTopicIndex
          );
          console.log(nextTopic);
          if (nextTopic && user) {
            const firstLessonOfNextTopic = nextTopic.lessons[0];
            console.log(firstLessonOfNextTopic);
            fetchCoursesProgress(
              user.uid,
              selectedCourse._id,
              nextTopic._id,
              nextTopic.sequentialTopic,
              firstLessonOfNextTopic._id,
              firstLessonOfNextTopic.videoId,
              firstLessonOfNextTopic.sequentialLesson
            )
              .then(() => {
                router.push(
                  `/dashboard/courses/${selectedCourse?.courseName}/${selectedCourse?._id}`
                );
              })
              .catch(() => {
                console.error("No hay temas disponible");
              });
          }
        } else if (user && selectedCourse && selectedTopic && nextLesson) {
          fetchCoursesProgress(
            user.uid,
            selectedCourse._id,
            selectedTopic._id,
            selectedTopic.sequentialTopic,
            nextLesson._id,
            nextLesson.videoId,
            nextLesson.sequentialLesson
          ).then(() => {
            console.log(nextLesson.sequentialLesson);
            onNextVideoClick(nextLesson.sequentialLesson);
          });
        }
      }
    }
  };

  const obtenerDuracionFormateada = (length: number) => {
    length = Math.round(length);

    const horas = Math.floor(length / 3600);
    const minutosRestantes = Math.floor((length % 3600) / 60);
    const segundos = length % 60;

    const duracionFormateada =
      (horas > 0 ? `${horas}:` : "") +
      (minutosRestantes < 10 ? "0" : "") +
      `${minutosRestantes}:${segundos < 10 ? "0" : ""}${segundos}`;

    return duracionFormateada;
  };

  const handleDuration = (duration: number) => {
    setDuracionTotal(duration);
  };

  const enableFollowVideoButton = async (progressVideo: any) => {
    const currentVideo = progressVideo.played;
    const threshold = 0.95;
    console.log(user);
    if (user && user.CourseProgress && user.CourseProgress.length > 0) {
      const courseProgressForCurrentTopic = user.CourseProgress.find(
        (progress: any) => progress.idCourse === selectedCourse?._id
      );

      if (courseProgressForCurrentTopic) {
        const lessonsProgress = courseProgressForCurrentTopic.topics[0].lessons;
        const currentLessonProgress = lessonsProgress.find(
          (lesson: any) =>
            lesson.sequentialLesson.trim() === sequentialLesson.toString()
        );

        if (currentLessonProgress) {
          if (currentVideo >= threshold) {
            if (typeof setViewVideo === "function") {
              setViewVideo(true);
              setEnableButton(true);
            }
          }
        }
      }
    } else {
      if (currentVideo >= threshold) {
        if (typeof setViewVideo === "function") {
          setViewVideo(true);
          setEnableButton(true);
        }
      }
    }
  };

  return (
    <LearningPahtVideoComponent
      isVideoReady={isVideoReady}
      selectedLesson={selectedLesson}
      handleDuration={handleDuration}
      enableFollowVideoButton={enableFollowVideoButton}
      handleNextVideo={handleNextVideo}
      obtenerDuracionFormateada={obtenerDuracionFormateada}
      userRating={userRating}
      handleRatingChange={handleRatingChange}
      enableButton={enableButton}
      updateLasVideoUser={updateLasVideoUser}
      duracionTotal={duracionTotal}
    />
  );
};
