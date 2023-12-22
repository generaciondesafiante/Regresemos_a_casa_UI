"use client";
import { FC, Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LearningPathProgress } from "../LearningPathProgress/LearningPathProgress";
import { LearningPathVideoClass } from "../LearningPathVideoClass/LearningPathVideoClass";
import { LearningPathTitleClass } from "../LearningPathTitleClass/LearningPathTitleClass";
import { Lesson } from "../../../types/types/lessons.type";
import { Topic } from "../../../types/types/topic.type";
import { Loading } from "../Loading/Loading";
import styles from "./LearningPath.module.css";

export const LearningPath: FC = () => {
  const { courseName, lessonId, tema, courseId } = useParams();

  const router = useRouter();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_COURSE_RESOURCES}/course/coursedata`
        );
        const data = await response.json();

        for (const course of data.courses) {
          for (const topic of course.topics) {
            const lesson = topic.lessons.find(
              (lesson: Lesson) => lesson.videoId === lessonId
            );
            if (lesson) {
              setSelectedTopic(topic);
              setSelectedLesson(lesson);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (lessonId) {
      fetchData();
    }
  }, [lessonId]);

  const handleItemClick = (index: number) => {
    const indexTopic = index;
    if (selectedTopic) {
      const selectedLesson = selectedTopic.lessons[index - 1];

      const url = `/dashboard/courses/${courseName}/${courseId}/${selectedLesson.videoId}/${tema}/${indexTopic}`;
      router.push(url);
    }
  };

  const handleNextVideo = (index: string) => {
    const currentIndexNumber = parseInt(index, 10);

    if (!isNaN(currentIndexNumber) && selectedTopic && selectedTopic.lessons) {
      if (
        currentIndexNumber >= 0 &&
        currentIndexNumber < selectedTopic.lessons.length
      ) {
        const nextLesson = selectedTopic.lessons[currentIndexNumber];

        setSelectedLesson(nextLesson);

        router.push(
          `/dashboard/courses/${courseName}/${courseId}/${
            nextLesson.videoId
          }/${tema}/${currentIndexNumber + 1}`
        );
      }
    }
  };
  return (
    <div className={styles["learningPath-container"]}>
      <Suspense fallback={<Loading />}>
        <LearningPathVideoClass
          selectedLesson={selectedLesson}
          course={selectedTopic}
          onNextVideoClick={handleNextVideo}
        />
      </Suspense>
      <LearningPathTitleClass
        course={selectedTopic}
        selectedLesson={selectedLesson}
      />
      <nav className={styles["classRoomRoute-container"]}>
        <LearningPathProgress
          course={selectedTopic}
          onItemClick={handleItemClick}
        />
      </nav>
    </div>
  );
};
