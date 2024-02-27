"use client";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { LearningPathProgress } from "../LearningPathProgress/LearningPathProgress";
import { LearningPathVideoClass } from "../LearningPathVideoClass/LearningPathVideoClass";
import { LearningPathTitleClass } from "../LearningPathTitleClass/LearningPathTitleClass";
import { fetchUserData } from "../../../api/user/userData";
import { User } from "../../../types/types/user.type";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { userInfo } from "../../../store/slices/userSlice";
import styles from "./LearningPath.module.css";

export const LearningPath: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { courseName, tema, courseId } = useParams();
  const { data: session } = useSession();
  const userId = session?.user.uid;

  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);

  const [dataUser, setDataUser] = useState<User | null>(null);
  const [viewVideo, setViewVideo] = useState(false);

  useEffect(() => {
    if (userId) {
      const userData = async () => {
        const data = await fetchUserData(userId);
        setDataUser(data);
      };
      userData();
    }
  }, [userId]);

  useEffect(() => {
    if (dataUser) {
      dispatch(userInfo(dataUser));
    }
  }, [dataUser, dispatch]);

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
        setViewVideo={setViewVideo}
        onNextVideoClick={handleNextVideo}
      />

      <LearningPathTitleClass />
      <nav className={styles["classRoomRoute-container"]}>
        <LearningPathProgress onItemClick={handleItemClick} />
      </nav>
    </div>
  );
};
