"use client";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { LearningPathProgress } from "../LearningPathProgress/LearningPathProgress";
import { LearningPathVideoClass } from "../LearningPathVideoClass/LearningPathVideoClass";
import { LearningPathTitleClass } from "../LearningPathTitleClass/LearningPathTitleClass";
import { Lesson } from "../../../types/types/lessons.type";
import { Topic } from "../../../types/types/topic.type";
import styles from "./LearningPath.module.css";

export const LearningPath: FC = () => {
  const { courseName, lessonId, tema, courseId } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.uid;

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [courseProgress, setCourseProgress] = useState<any[]>([]);
  const [viewVideo, setViewVideo] = useState(false);

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

  useEffect(() => {
    const sendVideoStatus = async () => {
      if (viewVideo && selectedTopic && selectedLesson) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/updateVideoStatus/${userId}/${courseId}/${selectedTopic._id}/${selectedLesson?._id}/${selectedLesson?.videoId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ viewVideo: true }),
            }
          );
        } catch (error) {
          console.error("Error al realizar la solicitud fetch:", error);
        }
      }
    };

    sendVideoStatus();
  }, [viewVideo, selectedTopic, selectedLesson, userId, courseId]);

  useEffect(() => {
    const userInformacion = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/userinformations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }),
          }
        );

        if (response.ok) {
          const dataUser = await response.json();

          if (dataUser.CourseProgress && dataUser.CourseProgress.length > 0) {
            setCourseProgress(dataUser.CourseProgress);
          }
        } else {
          console.error(
            "Error al obtener la información del usuario:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al realizar la solicitud fetch:", error);
      }
    };
    userInformacion();
  }, [userId]);

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
      <LearningPathVideoClass
        selectedLesson={selectedLesson}
        setViewVideo={setViewVideo}
        onNextVideoClick={handleNextVideo}
        courseProgress={courseProgress}
        selectedTopic={selectedTopic}
      />

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
