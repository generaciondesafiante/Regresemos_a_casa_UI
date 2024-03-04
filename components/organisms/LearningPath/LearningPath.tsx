"use client";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LearningPathProgress } from "../LearningPathProgress/LearningPathProgress";
import { LearningPathVideo } from "../LearningPathVideo/LearningPathVideo";
import { LearningPathTitleClass } from "../LearningPathTitle/LearningPathTitle";
import { fetchUserData } from "../../../services/user/userData";
import { User } from "../../../types/types/user.type";
import { useAppDispatch } from "../../../store/store";
import { userInfo } from "../../../store/slices/userSlice";
import styles from "./LearningPath.module.css";

export const LearningPath: FC = () => {
  const dispatch = useAppDispatch();

  const { data: session } = useSession();
  const userId = session?.user.uid;

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

  return (
    <div className={styles["learningPath-container"]}>
      <LearningPathVideo />

      <LearningPathTitleClass />
      <nav className={styles["classRoomRoute-container"]}>
        <LearningPathProgress />
      </nav>
    </div>
  );
};
