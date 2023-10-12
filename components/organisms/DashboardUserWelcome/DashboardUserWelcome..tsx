"use client";
import { useEffect, useState } from "react";
import styles from "./DashboardUserWelcome.module.css";

export const DashboardUserWelcome = () => {
  const [name, setName] = useState<string | null>("");

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    if (savedName) {
      const nameCapitalized = capitalizeFirstLetter(savedName);
      setName(nameCapitalized);
    }
  }, []);

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className={styles["userWelcome-container"]}>
      <div className={styles["userWelcome-content"]}>
        <h2 className={styles["userWelcome-title"]}>Bienvenido/a, {name}</h2>
        <p className={styles["userWelcome-paragraph"]}>
          ¡Esperamos que tengas un bendecido día!
        </p>
        <img
          src="https://i.imgur.com/nfQ90IZ.png"
          alt=""
          className={styles["userWelcome-decorationImg"]}
        />
      </div>
      {/* Change classes when the respective component is created */}
      <div className={styles["dashboard-continue_course"]}>
        <h2 className={styles["continue-course_subtitle"]}>
          ¡Continúa tu curso!
        </h2>
        <img
          className={styles["continue-course_video"]}
          src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
          alt=""
        />
      </div>
      <div className={styles["dashboard-continue_course"]}>
        {/* <h2 className={styles["continue-course_subtitle"]}>¡Recursos para ti!</h2> */}
        <h2 className={styles["continue-course_subtitle"]}>
          ¡Recursos para ti!
        </h2>
        <div className={styles["dashboard-subcontent_studyMaterial"]}>
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
          <img
            className={styles["dashboard-studyMaterial"]}
            src="https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
