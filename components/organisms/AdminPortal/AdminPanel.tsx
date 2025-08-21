"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { AdminPanel as AdminPanelType } from "@/types/admin/dashboardAdmin";

import { dashboardAdminService } from "@/shared/services/admin/adminsDashboard";
import Icon from "@/shared/components/Icons";
import Text from "@/shared/components/Text";
import  Button  from "@/shared/components/Button/Button";

import styles from "./AdminPanel.module.css";

export const AdminPanel = () => {
  const { data: session } = useSession();
  const userId = session?.user?.uid;
  const [dashboardAdmin, setDashboardAdmin] = useState<AdminPanelType | null>(
    null
  );

  useEffect(() => {
    const data = async () => {
      if (userId) {
        try {
          const fetchDataAdmin = await dashboardAdminService.getDashboardAdmin(
            userId
          );
          setDashboardAdmin(fetchDataAdmin);
        } catch (error) {
          console.error("Error fetching dashboard admin data:", error);
        }
      }
    };
    data();
  }, [userId]);

  return (
    <main className={styles["adminPanel"]}>
      <div className={styles["adminPanel__container"]}>
        <section className={styles["adminPanel__container--sectionLeft"]}>
          {/* Admins */}
          <div className={styles["adminPanel__content--admins"]}>
            <h1 className={styles["adminPanel__title--admins"]}>
              Administradores
            </h1>
            <div className={styles["adminPanel__content-users--admins"]}>
              <div className={styles["adminPanel__content-infoUser--admins"]}>
                <img className={styles["adminPanel__image-infoUser--admins"]} />
                <p className={styles["adminPanel__name-infoUser--admins"]}></p>
              </div>
              {dashboardAdmin?.admins.latestAdmins.map((admin) => (
                <div key={admin.id}>
                  <p>{admin.name}</p>
                  <p>{admin.email}</p>
                </div>
              ))}
              <p className={styles["adminPanel__notFound-user--admins"]}>
                No hay Administradores disponibles
              </p>
            </div>
            <div className={styles["adminPanel__content-buttonEdit--admins"]}>
              <Link
                href={"/dashboard/adminPanel/editAdmin"}
                className={styles["adminPanel__link-buttonEdit"]}
              >
                <Button
                  className={styles["adminPanel__buttonEdit--admins"]}
                  icon="LuPencil"
                  iconPosition="right"
                >
                  Editar
                </Button>
              </Link>
            </div>
          </div>
          {/* Estudiantes */}
          <div className={styles["adminPanel__content--students"]}>
            <h1 className={styles["adminPanel__title--students"]}>
              Estudiantes
            </h1>
            <div className={styles["adminPanel__count--students"]}>
              <p>
                Cantidad de estudiantes <b>{dashboardAdmin?.totalStudents}</b>
              </p>
            </div>
          </div>
        </section>
        <section className={styles["adminPanel__container--sectionRight"]}>
          {/* Cursos */}
          <div className={styles["adminPanel__content--courses"]}>
            <h1 className={styles["adminPanel__title--courses"]}>Cursos</h1>
            <div className={styles["adminPanel__conent-courses--courses"]}>
              {dashboardAdmin?.latestCourses.map((course) => (
                <div key={course.id}>
                  <p>{course.nameCourse}</p>
                </div>
              ))}
              <p className={styles["adminPanel__course-notFoud--courses"]}>
                No hay cursos disponibles.
              </p>
            </div>
            <div className={styles["adminPanel__content-button--courses"]}>
              <Link
                href={"/dashboard/adminPanel/courses"}
                className={styles["adminPanel__link-buttonEdit"]}
              >
                <Button
                  className={styles["adminPanel__button--courses"]}
                  icon="LuEye"
                  iconPosition="right"
                >
                  Ver
                </Button>
              </Link>
            </div>
          </div>
          {/* Recursos */}
          <div className={styles["adminPanel__content--resources"]}>
            <h1 className={styles["adminPanel__title--resources"]}>Recursos</h1>
            <div className={styles["adminPanel__conent-icons--resources"]}>
              <div className={styles["adminPanel__icons--resources"]}>
                <Icon name={"LuBookPlus"} size={42} color="var(--darkBlue)" />
              </div>
              <div className={styles["adminPanel__icons--resources"]}>
                <Icon name={"LuSquarePlay"} size={42} color="var(--darkBlue)" />
              </div>
              <div className={styles["adminPanel__icons--resources"]}>
                <Icon name={"LuImage"} size={42} color="var(--darkBlue)" />
              </div>
              <div className={styles["adminPanel__icons--resources"]}>
                <Icon name={"LuMusic"} size={42} color="var(--darkBlue)" />
              </div>
              <div className={styles["adminPanel__icons--resources"]}>
                <Icon name={"LuFolder"} size={42} color="var(--darkBlue)" />
              </div>
            </div>
            {/* <div className={styles["adminPanel__count--students"]}> */}
            <div className={styles["adminPanel__count--resources"]}>
              <Text className={styles["adminPanel__count--title"]}>Cantidad de recursos {dashboardAdmin?.totalResources}</Text>
            </div>
            {/* </div> */}
            <div className={styles["adminPanel__content-button--resources"]}>
              <Link
                href={"/dashboard/adminPanel/resources"}
                className={styles["adminPanel__link-buttonEdit"]}
              >
                <Button
                  className={styles["adminPanel__button--courses"]}
                  icon="LuEye"
                  iconPosition="right"
                >
                  Ver
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
