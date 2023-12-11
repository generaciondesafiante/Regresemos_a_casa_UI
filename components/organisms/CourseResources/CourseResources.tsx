/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import styles from "./CourseResources.module.css";

export const CourseResources: FC = () => {
  const FILLER_CONTENT_IMG =
    "https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg";
  return (
    <div className={styles["resources-container"]}>
      <h1 className={styles["resources-title"]}>Recursos</h1>
      <div className={styles["resources-content"]}>
        <section className={styles["resources-subcontent"]}>
          <h3 className={styles["resources-subtitle"]}>Libros</h3>
          <div className={styles["resources-content_studyMaterial"]}>
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
          </div>
        </section>
        <section className={styles["resources-subcontent"]}>
          <h3 className={styles["resources-subtitle"]}>Documentales</h3>
          <div className={styles["resources-content_studyMaterial"]}>
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
          </div>
        </section>
        <section className={styles["resources-subcontent"]}>
          <h3 className={styles["resources-subtitle"]}>Estudios</h3>
          <div className={styles["resources-content_studyMaterial"]}>
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
            <img src={FILLER_CONTENT_IMG} alt="" />
          </div>
        </section>
      </div>
    </div>
  );
};
