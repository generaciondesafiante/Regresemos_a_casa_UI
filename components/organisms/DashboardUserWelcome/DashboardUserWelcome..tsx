/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactPlayer from "react-player";
import { fetchUserData } from "../../../services/user/userData";
import { useAppDispatch } from "../../../store/store";
import { userInfo } from "../../../store/slices/userSlice";
import styles from "./DashboardUserWelcome.module.css";

interface UserData {
  courseName: string;
  idCourse: string;
  idVideo: string;
  tema: string;
  indexTopic: string;
  urlVideo: string;
  _id: string;
  lastViewedVideos: any;
}

export const DashboardUserWelcome = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const idUser = session?.user.uid;
  const name = session?.user?.name;
  const urlVideoDefault =
    "https://www.youtube.com/embed/CovSIgAtFIs?si=kofztRWT519UyJug";
  const routeVideoDefault =
    "/dashboard/courses/curso_basico_biblico/65cfb9adbd9fbd492f793fa1/04306687-b6b4-49eb-95fd-f153de3c2fb2/introducción/1";
  const [data, setData] = useState<UserData | null>(null);

  const [isVideoReady, setisVideoReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const FILLER_CONTENT_IMG =
    "https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (idUser) {
      const userData = async () => {
        const dataUser = await fetchUserData(idUser);
        setData(dataUser);
        dispatch(userInfo(dataUser));

        if (
          dataUser?.lastViewedVideos?.length > 0 &&
          dataUser?.lastViewedVideos[0]?.urlVideos
        ) {
          setIsLoading(false);
          setisVideoReady(true);
        } else {
          setIsLoading(false);
          setisVideoReady(false);
        }
      };
      userData();
    }
  }, [idUser]);

  return (
    <div className={styles["dashboardUserWelcome-container"]}>
      <div className={styles["dashboardUserWelcome-welcomeMessageContainer"]}>
        <h3 className={styles["dashboardUserWelcome-welcomeMessage_title"]}>
          Bienvenid@, {name}
        </h3>
        <p className={styles["dashboardUserWelcome-welcomeMessage_paragraph"]}>
          ¡Esperamos que tengas un bendecido día!
        </p>
        <img
          src="https://i.imgur.com/g0891Ec.png"
          alt="Image of book"
          className={
            styles["dashboardUserWelcome-welcomeMessage_decorationImg"]
          }
        />
      </div>

      {isLoading ? (
        <div>
          <div className={styles["titleVideo-skeletonVideo"]}> </div>
          <div className={styles["lastViewedVideo-skeletonVideo"]}></div>
        </div>
      ) : isVideoReady ? (
        <div>
          <h3 className={styles["dashboardUserWelcome-subtitle"]}>
            ¡Continúa tu curso!
          </h3>
          <div
            className={styles["dashboardUserWelcome-continuePlayingContainer"]}
          >
            <ReactPlayer
              onClick={() =>
                router.push(
                  `/dashboard/courses/${data?.lastViewedVideos[0]?.courseName}/${data?.lastViewedVideos[0]?.idCourse}/${data?.lastViewedVideos[0]?.idVideo}/${data?.lastViewedVideos[0]?.tema}/${data?.lastViewedVideos[0]?.indexTopic}`
                )
              }
              url={data?.lastViewedVideos[0]?.urlVideo}
              controls={true}
              playsinline={true}
              pip={true}
              stopOnUnmount
              width={"100%"}
              height={"100%"}
              light={true}
              className={styles["dashboardUserWelcome-continuePlaying"]}
            />
          </div>
        </div>
      ) : (
        <div>
          <h3 className={styles["dashboardUserWelcome-subtitle"]}>
            ¡Inicia el recorrido de la fé!
          </h3>
          <div
            className={styles["dashboardUserWelcome-continuePlayingContainer"]}
          >
            <ReactPlayer
              onClick={() => router.push(routeVideoDefault)}
              url={urlVideoDefault}
              controls={true}
              playsinline={true}
              pip={true}
              stopOnUnmount
              width={"100%"}
              height={"100%"}
              light={true}
              className={styles["dashboardUserWelcome-continuePlaying"]}
            />
          </div>
        </div>
      )}
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
