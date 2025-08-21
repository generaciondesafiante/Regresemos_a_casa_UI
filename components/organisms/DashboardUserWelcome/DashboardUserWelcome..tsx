/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactPlayer from "react-player";
import { fetchUserData } from "../../../services/user/userData";
import { useAppDispatch } from "../../../store/store";
import { userInfo } from "../../../store/slices/userSlice";
import { fetchResourcesData } from "../../../services/resources/resources";
import styles from "./DashboardUserWelcome.module.css";
import { allResources } from "../../../store/slices/resourcesByRol";
import { fetchCoursesData } from "../../../services/courses/coursesData";
import { Course } from "../../../types/types/course.types";
import { Topic } from "../../../types/types/topic.type";
import { Resource } from "../../../types/types/Resources";
import { selectCourse } from "../../../store/slices/courseSlice";
import { selectTopic } from "../../../store/slices/topicsSlice";
import { selectedResource } from "../../../store/slices/ResourceSlice";
import { LastViewedResource } from "../../../types/types/lastViewedResource";
import { ResourceDashboard } from "../../molecules/ResourcesDashboard/ResourceDashboard";
import ConditionalRendererComponentePrivate from "../../../feature/BlockedComponentsPrivatesFeatureFlags/conditionalRenderComponentsPrivates";

export const DashboardUserWelcome = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const idUser = session?.user.uid;
  const name = session?.user?.name;

  const urlVideoDefault =
    "https://www.youtube.com/embed/CovSIgAtFIs?si=kofztRWT519UyJug";
  const routeVideoDefault =
    "/dashboard/courses/curso_de_biblico_strict/6679abed07b3075c743257a2";

  const [isVideoReady, setisVideoReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastViewedResource, setLastViewedResource] =
    useState<LastViewedResource | null>(null);

  useEffect(() => {
    if (idUser) {
      const userData = async () => {
        const dataUser = await fetchUserData(idUser);
        dispatch(userInfo(dataUser));
        if (
          dataUser?.lastViewedResources?.length > 0 &&
          dataUser?.lastViewedResources[0]?.resource
        ) {
          setLastViewedResource(dataUser.lastViewedResources[0]);
          setIsLoading(false);
          setisVideoReady(true);
        } else {
          setIsLoading(false);
          setisVideoReady(false);
        }
      };

      const resources = async () => {
        const dataResources = await fetchResourcesData(idUser);
        dispatch(allResources(dataResources));
      };
      userData();
      resources();
    }
  }, [idUser, dispatch]);

  const handleClicklastViewedResource = async () => {
    try {
      const courses = await fetchCoursesData();
      if (!courses || !lastViewedResource) {
        console.warn("No courses data or last viewed resource available.");
        return;
      }

      const course = courses.find(
        (course: Course) => course._id === lastViewedResource.courseId
      );

      if (course) {
        dispatch(selectCourse(course));

        const topic = course.topic.find(
          (topic: Topic) => topic._id === lastViewedResource.topicId
        );
        if (topic) {
          dispatch(selectTopic(topic));
          const resourceIndex = topic.resources.findIndex(
            (resource: Resource) =>
              resource._id === lastViewedResource.resource._id
          );
          if (resourceIndex === -1) {
            console.warn("Resource not found.");
            return;
          }
          const courseName = course.nameCourse
            .replace(/\s+/g, "_")
            .replace(/́/g, "")
            .replace(/ñ/g, "n")
            .toLowerCase();

          const topicName = topic.nameTopic
            .replace(/\s+/g, "_")
            .replace(/́/g, "")
            .replace(/ñ/g, "n")
            .toLowerCase();
          const resource = topic.resources.find(
            (resource: Resource) =>
              resource._id === lastViewedResource.resource._id
          );
          dispatch(selectedResource(resource));
          router.push(
            `/dashboard/courses/${courseName}/${course._id}/${
              lastViewedResource.resource._id
            }/${topicName}/${resourceIndex + 1}`
          );
        }
      } else {
        console.warn("Course not found.");
      }
    } catch (error) {
      console.error("Error fetching courses data:", error);
    }
  };

  return (
    <ConditionalRendererComponentePrivate viewName={"Dashboard"}>
      <div className={styles["dashboardUserWelcome-container"]}>
        <div className={styles["dashboardUserWelcome-welcomeMessageContainer"]}>
          <h3 className={styles["dashboardUserWelcome-welcomeMessage_title"]}>
            Bienvenid@, {name}
          </h3>
          <p
            className={styles["dashboardUserWelcome-welcomeMessage_paragraph"]}
          >
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
              className={
                styles["dashboardUserWelcome-continuePlayingContainer"]
              }
            >
              <ReactPlayer
                onClick={() => handleClicklastViewedResource()}
                url={lastViewedResource?.resource?.resourceUrl}
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
              className={
                styles["dashboardUserWelcome-continuePlayingContainer"]
              }
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

        <ResourceDashboard />
      </div>
    </ConditionalRendererComponentePrivate>
  );
};
