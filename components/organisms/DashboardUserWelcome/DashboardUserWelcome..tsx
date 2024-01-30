/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactPlayer from "react-player";
import styles from "./DashboardUserWelcome.module.css";

interface UserData {
  courseName: string;
  idCourse: string;
  idVideo: string;
  tema: string;
  indexTopic: string;
  urlVideo: string;
  _id: string;
}

export const DashboardUserWelcome = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const idUser = session?.user.uid;
  const name = session?.user?.name;
  const urlVideoDefault =
    "https://www.youtube.com/embed/CovSIgAtFIs?si=kofztRWT519UyJug";
  const routeVideoDefault =
    "/dashboard/courses/curso_basico_biblico/65b2a19a0b68c1de28c171c2/04306687-b6b4-49eb-95fd-f153de3c2fb2/introducción/1";
  const [data, setData] = useState<UserData | null>(null);
  const [isVideoReady, setisVideoReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isVideoReady);
  const FILLER_CONTENT_IMG =
    "https://static.wixstatic.com/media/d166cc_4cc837baf9254000a0f3963193c6b07a~mv2.jpg/v1/fill/w_368,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Romanos%2011111.jpg";

  useEffect(() => {
    const userInformacion = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/userinformations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: idUser }),
          }
        );

        if (response.ok) {
          const dataUser = await response.json();

          if (
            dataUser.lastViewedInfo &&
            Object.keys(dataUser.lastViewedInfo).length > 0
          ) {
            setData(dataUser.lastViewedInfo);
            setisVideoReady(true);
          } else {
            setisVideoReady(false);
          }
        } else {
          console.error(
            "Error al obtener la información del usuario:",
            response.statusText
          );
          setisVideoReady(false);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud fetch:", error);
      } finally {
        setIsLoading(false);
      }
    };
    userInformacion();
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
                  `/dashboard/courses/${data?.courseName}/${data?.idCourse}/${data?.idVideo}/${data?.tema}/${data?.indexTopic}`
                )
              }
              url={data?.urlVideo}
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
