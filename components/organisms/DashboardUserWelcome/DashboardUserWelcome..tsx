/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import styles from "./DashboardUserWelcome.module.css";

export const DashboardUserWelcome = () => {
  const { data: session } = useSession();
  const name = session?.user?.name;
  const FILLER_CONTENT_IMG =
    "https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg";
  return (
    <div className={styles["dashboardUserWelcome-container"]}>
      <div className={styles["dashboardUserWelcome-welcomeMessageContainer"]}>
          <h3 className={styles["dashboardUserWelcome-welcomeMessage_title"]}>Bienvenid@, {name}</h3>
          <p className={styles["dashboardUserWelcome-welcomeMessage_paragraph"]}>¡Esperamos que tengas un bendecido día!</p>
        <img
          src="https://i.imgur.com/g0891Ec.png"
          alt="Image of book"
          className={styles["dashboardUserWelcome-welcomeMessage_decorationImg"]}
        />
      </div>
      <h3 className={styles["dashboardUserWelcome-subtitle"]}>¡Continúa tu curso!</h3>
      <div className={styles["dashboardUserWelcome-continuePlayingContainer"]}>
        <img 
        src={FILLER_CONTENT_IMG} alt=""
        />
      </div>
      <h3 className={styles["dashboardUserWelcome-subtitle"]}>Recursos para ti</h3>
      <div className={styles["dashboardUserWelcome-resourcesContainer"]}>
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
    </div>
  );
};
