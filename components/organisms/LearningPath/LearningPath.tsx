"use client";
import { FC, useState, useEffect } from "react";
import { LearningPahtProgress } from "../LearningPahtProgress/LearningPahtProgress";
import { LearningPathTitleClass } from "../LearningPathTitleClass/LearningPathTitleClass";
import { LearningPathVideoClass } from "../LearningPathVideoClass/LearningPathVideoClass";
import styles from "./LearningPath.module.css";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export interface Course {
  course: {
    _id: string;
    name: string;
    endpoint: string;
    content: {
      title: string;
      description: string;
      url: string;
      idVideo: number;
    }[];
    id: number;
  } | null;
}
export const LearningPath: FC = async () => {
  const { idtema } = useParams();
  const router = useRouter();

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/coursedata`
      );
      const json = await response.json();
      const filteredCourse = json.courses.find(
        (course: Course) => course.id === Number(idtema)
      );
      setSelectedCourse(filteredCourse || null);

      if (filteredCourse?.course.content.length > 0) {
        setSelectedVideoId(filteredCourse.course.content[0].idVideo);
      }
    };

    if (idtema) {
      fetchData();
    }
  }, [idtema]);

  const handleItemClick = (index: number) => {
    const url = `/dashboard/path/course/${selectedCourse?.id}/${
      selectedCourse?.endpoint
    }/${selectedCourse?.content[index - 1].idVideo}`;
    router.push(url);
  };
  return (
    <div className={styles["learningPath-container"]}>
      <LearningPathVideoClass course={selectedCourse} />
      <LearningPathTitleClass course={selectedCourse} />

      <nav className={styles["classRoomRoute-container"]}>
        <LearningPahtProgress
          course={selectedCourse}
          isSelected={true}
          onItemClick={handleItemClick}
        />
      </nav>
    </div>
  );
};
