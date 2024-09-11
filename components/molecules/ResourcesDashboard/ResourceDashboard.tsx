import React from "react";
import styles from "./ResourceDashboard.module.css";
export const ResourceDashboard = () => {
  const FILLER_CONTENT_IMG =
    "https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg";

  return (
    <div>
      <h3 className={styles["dashboardUserWelcome-subtitle"]}>
        Recursos para ti
      </h3>
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
