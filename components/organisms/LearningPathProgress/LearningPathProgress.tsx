"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { selectLesson } from "../../../store/slices/lessonSlice";
import { LessonItem } from "./LessonItem";

export const LearningPathProgress = () => {
  const { lessonId } = useParams();
  const dispatch = useAppDispatch();
  const [lessonStatus, setLessonStatus] = useState<boolean[]>([]);

  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);

  const courseProgress = useAppSelector(
    (state) => state.user.userInfo?.CourseProgress
  );
  const infoSelectedLesson = useAppSelector(
    (state) => state.lessons.selectedLesson
  );

  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );

  useEffect(() => {
    if (selectedTopic && selectedTopic.lessons) {
      const lessonIdArray = Array.isArray(lessonId) ? lessonId : [lessonId];

      const selectedLessonData = selectedTopic.lessons.find((lesson: any) => {
        if (lessonIdArray.includes(lesson.videoId)) {
          return true;
        } else if (lesson.typeLesson === "assessment") {
          dispatch(selectLesson({ type: "assessment", lessonData: lesson }));
          return false;
        }
        return false;
      });

      if (
        selectedLessonData &&
        selectedLessonData.typeLesson !== "assessment"
      ) {
        const lessonType = selectedLessonData.typeLesson;

        dispatch(
          selectLesson({ type: lessonType, lessonData: selectedLessonData })
        );
      }
    }

    if (selectedTopic && courseProgress) {
      const courseProgressForCurrentTopic = courseProgress.find(
        (progress) => progress.idCourse === selectedCourse?._id
      );

      const sequentialTopicInCourseProgress = parseInt(
        courseProgressForCurrentTopic?.topics[0].sequentialTopic
      );
      const sequentialTopicCurrent = parseInt(selectedTopic?.sequentialTopic);

      if (sequentialTopicCurrent < sequentialTopicInCourseProgress) {
        const newLessonStatus = selectedTopic.lessons.map(() => true);
        setLessonStatus(newLessonStatus);
      } else if (sequentialTopicCurrent === sequentialTopicInCourseProgress) {
        const sequentialLessonUser = parseInt(
          courseProgressForCurrentTopic.topics[0].lessons[0].sequentialLesson.trim()
        );

        const newLessonStatus = selectedTopic.lessons.map((lesson) => {
          const lessonNumber = parseInt(lesson.sequentialLesson || "0");
          return lessonNumber <= sequentialLessonUser;
        });

        setLessonStatus(newLessonStatus);
      }
    }
  }, [
    selectedTopic,
    lessonId,
    dispatch,
    courseProgress,
    selectedCourse,
    infoSelectedLesson,
  ]);

  if (!selectedTopic || !selectedTopic.lessons) {
    return <div></div>;
  }

  return (
    <>
      {selectedTopic?.lessons.map((lesson) => (
        <LessonItem
          key={lesson.sequentialLesson}
          lesson={lesson}
          infoSelectedLesson={infoSelectedLesson}
          lessonStatus={lessonStatus}
          selectedCourse={selectedCourse}
        />
      ))}
    </>
  );
};
