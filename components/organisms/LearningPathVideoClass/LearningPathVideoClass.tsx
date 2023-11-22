import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import styles from "./LearningPathVideoClass.module.css";
import { Course } from "../LearningPath/LearningPath";
import { FC } from "react";

interface LearningPathVideoClassProps {
  course: Course | null;
}
export const LearningPathVideoClass: FC<LearningPathVideoClassProps> = ({
  course,
}) => {
  if (!course) {
    return <div>No se encontraron datos para mostrar</div>;
  }
  return (
    <div className={styles["learningPathVideoClass-container"]}>
      <iframe
        className={styles["learningPathVideoClass-video"]}
        src={course.content[0].url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <div
        className={styles["learningPathVideoClass-content_videoInteraction"]}
      >
        <div
          className={
            styles["learningPathVideoClass-subcontent_videoInteraction"]
          }
        >
          <p
            className={styles["learningPathVideoClass-videoInteraction_title"]}
          >
            1 H 40 MIN
          </p>
          <StarIcon
            className={styles["learningPathVideoClass-videoInteraction_icon"]}
          />
          <StarIcon
            className={styles["learningPathVideoClass-videoInteraction_icon"]}
          />
          <StarIcon
            className={styles["learningPathVideoClass-videoInteraction_icon"]}
          />
        </div>
        <div className={styles["learningPathVideoClass-subcontent_btn"]}>
          <div className={styles["learningPathVideoClass-btn_activity"]}>
            <Link
              href={"/"}
              className={styles["learningPathVideoClass-btn_textActivity"]}
            >
              ACTIVIDAD
            </Link>
          </div>
          <button
            className={`${styles["learningPathVideoClass-btn_next"]} ${styles["learningPathVideoClass-btn_textNext"]}`}
            // onClick={handleUrlId}
          >
            SIGUIENTE
          </button>
        </div>
      </div>
    </div>
  );
};
