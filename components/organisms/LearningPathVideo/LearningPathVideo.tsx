"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/store";
import { LearningPahtVideoComponent } from "./LearningPahtVideoComponent";
import { useDispatch } from "react-redux";
import { selectedResource } from "../../../store/slices/ResourceSlice";
import { useSession } from "next-auth/react";
import { fetchCoursesProgress } from "../../../services/user/CourseProgress";
import { useRouter } from "next/navigation";

export const LearningPathVideo = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session } = useSession();
  const [userRating, setUserRating] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [videoProgress, setVideoProgress] = useState<number>(0);

  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  console.log(selectedTopic);

  const selectedResourceTopic = useAppSelector((state) => {
    const resource = state.resource.selectedResource;
    return typeof resource?._id === "string" ? resource._id : resource?._id._id;
  });

  console.log(selectedResourceTopic);
  const userInformation = useAppSelector((state) => state.user.userInfo);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoReady(true);
    }, 200);

    return () => setIsVideoReady(false);
  }, [selectedResourceTopic]);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const getFormattedDuration = (length: number) => {
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

  const handleProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    const newProgress = state.played;
    setVideoProgress(newProgress);

    if (newProgress >= 0.9) {
      if (
        selectedCourse &&
        selectedTopic &&
        selectedResourceTopic &&
        session?.user.uid
      ) {
        fetchCoursesProgress(
          session.user.uid,
          selectedCourse._id,
          selectedTopic._id,
          selectedResourceTopic
        );
      }
    }
  };

  const handleDuration = (duration: number) => {
    setTotalDuration(duration);
  };

  const handleNextVideoClick = () => {
    if (selectedTopic && selectedResourceTopic) {
      const currentLessonIndex = selectedTopic.resources.findIndex(
        (resource) => resource._id === selectedResourceTopic
      );
      if (
        currentLessonIndex !== -1 &&
        currentLessonIndex < selectedTopic.resources.length - 1
      ) {
        const nextResourceFull =
          selectedTopic.resources[currentLessonIndex + 1];

        if (nextResourceFull) {
          dispatch(selectedResource(nextResourceFull));
          const nameCourse = selectedCourse?.nameCourse
            .replace(/\s+/g, "_")
            .replace(/́/g, "")
            .replace(/ñ/g, "n")
            .toLowerCase();
          const nameTopic = selectedTopic.nameTopic
            .replace(/\s+/g, "_")
            .replace(/́/g, "")
            .replace(/ñ/g, "n")
            .toLowerCase();

          router.push(
            `/dashboard/courses/${nameCourse}/${selectedCourse?._id}/${
              nextResourceFull._id
            }/${nameTopic}/${currentLessonIndex + 2}`
          );
        }
      }
    }
  };

  const currentResourceIndex =
    selectedTopic?.resources.findIndex(
      (resource) => resource._id === selectedResourceTopic
    ) ?? -1;

  return (
    <LearningPahtVideoComponent
      isVideoReady={isVideoReady}
      selectedResource={selectedResourceTopic}
      handleDuration={handleDuration}
      getFormattedDuration={getFormattedDuration}
      userRating={userRating}
      handleRatingChange={handleRatingChange}
      totalDuration={totalDuration}
      onNextVideoClick={handleNextVideoClick}
      handleProgress={handleProgress}
      videoProgress={videoProgress}
      typeOfRouteCourse={selectedCourse?.typeOfRoute}
      userProgressCourse={userInformation?.CourseProgress}
      currentResourceIndex={currentResourceIndex}
      selectedTopic={selectedTopic}
    />
  );
};
