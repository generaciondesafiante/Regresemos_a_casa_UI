"use client";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LearningPathProgress } from "../LearningPathProgress/LearningPathProgress";
import { fetchUserData } from "../../../services/user/userData";
import { User } from "../../../types/types/user.type";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { userInfo } from "../../../store/slices/userSlice";
import { TypeResource } from "./TypeResource";
import styles from "./LearningPath.module.css";
import { useParams } from "next/navigation";
import { fetchLastViewedVideos } from "../../../services/user/lastViewedResources";

export const LearningPath: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { data: session } = useSession();
  const userId = session?.user.uid;
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);
  
  const [dataUser, setDataUser] = useState<User | null>(null);

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

  useEffect(() => {
    const { courseId, lessonId } = params;

    if (typeof courseId === "string" && typeof lessonId === "string") {
      fetchLastViewedVideos(
        session?.user.uid || "",
        courseId,
        selectedTopic?._id || "",
        lessonId
      );
    }
  }, [params, session?.user.uid, selectedTopic?._id]);

  return (
    <div className={styles["learningPath-container"]}>
      <TypeResource />
      <nav className={styles["classRoomRoute-container"]}>
        <LearningPathProgress />
      </nav>
    </div>
  );
};
