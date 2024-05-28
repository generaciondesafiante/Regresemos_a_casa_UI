"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./AdminPortal.module.css";
import { fetchAllAdmin } from "../../../services/user/allAdmis";
import { fetAllStudents } from "../../../services/user/allStudents";
import { Button } from "../../atoms";
import AdminPencilIcon from "../../atoms/icons/adminPortal/AdminPencilIcon";
import CoursesEyesIcon from "../../atoms/icons/adminPortal/CoursesEyesIcon";
import ResourcesFileIcon from "../../atoms/icons/adminPortal/ResourcesFileIcon";
import ResourcesMovieIcon from "../../atoms/icons/adminPortal/ResourcesMovieIcon";
import ResourcesImageIcon from "../../atoms/icons/adminPortal/ResourcesImageFill";
import ResourcesMusicIcon from "../../atoms/icons/adminPortal/ResourcesMusicIcon";
import ResourcesBookIcon from "../../atoms/icons/adminPortal/ResourcesBookIcon";
import Link from "next/link";
import { fetchCoursesData } from "../../../services/courses/coursesData";
import { Course } from "../../../types/types/course.types";

interface Admin {
  _id: string;
  name: string;
  lastname: string;
  image: string;
}
// interface Course {
//   name:string
// }

export const AdminPortal = async () => {
  const { data: session } = useSession();
  const userId = session?.user?.uid || "";
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [allStudents, setAllStudents] = useState(0);
  const [allCourses, setAllCourses] = useState<Course[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminsAll = await fetchAllAdmin(userId);
        if (adminsAll && adminsAll.admins) {
          setAdmins(adminsAll.admins.slice(0, 3));
        } else {
          setAdmins([]);
        }

        const allStudents = await fetAllStudents(userId);
        setAllStudents(allStudents);

        const allCourses = await fetchCoursesData();
        console.log(allCourses);
        if (allCourses) {
          setAllCourses(allCourses.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, [userId]);

  return (
    <main className={styles["adminPortal"]}>
      <div className={styles["adminPortal__container"]}>
        <section className={styles["adminPortal__container--sectionLeft"]}>
          <div className={styles["adminPortal__content--admins"]}>
            <h1 className={styles["adminPortal__title--admins"]}>
              Administradores
            </h1>
            <div className={styles["adminPortal__content-users--admins"]}>
              {admins.length > 0 ? (
                admins.map((admin, index) => (
                  <div
                    className={styles["adminPortal__content-infoUser--admins"]}
                    key={index}
                  >
                    <img
                      src={admin.image}
                      alt={admin.name}
                      className={styles["adminPortal__image-infoUser--admins"]}
                    />
                    <p className={styles["adminPortal__name-infoUser--admins"]}>
                      {admin.name} {admin.lastname}
                    </p>
                  </div>
                ))
              ) : (
                <p className={styles['adminPortal__notFound-user--admins']}>No hay Administradores disponibles</p>
              )}
            </div>
            <div className={styles["adminPortal__content-buttonEdit--admins"]}>
              <Link
                href={"/dashboard/panelAdmin/admin"}
                className={styles["adminPortal__link-buttonEdit"]}
              >
                <Button className={styles["adminPortal__buttonEdit--admins"]}>
                  Editar
                  <AdminPencilIcon />
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles["adminPortal__content--students"]}>
            <h1 className={styles["adminPortal__title--students"]}>
              Estudiantes
            </h1>
            <div className={styles["adminPortal__count--students"]}>
              <p>
                Cantidad de estudiantes <b>{allStudents}</b>
              </p>
            </div>
          </div>
        </section>
        <section className={styles["adminPortal__container--sectionRight"]}>
          <div className={styles["adminPortal__content--courses"]}>
            <h1 className={styles["adminPortal__title--courses"]}>Cursos</h1>
            <div className={styles["adminPortal__conent-courses--courses"]}>
              {allCourses && allCourses.length > 0 ? (
                allCourses.map((course, index) => (
                  <p
                    className={styles["adminPortal__course-item--courses"]}
                    key={index}
                  >
                    {course.courseName}
                  </p>
                ))
              ) : (
                <p className={styles['adminPortal__course-notFoud--courses']}>No hay cursos disponibles.</p>
              )}
            </div>
            <div className={styles["adminPortal__content-button--courses"]}>
              <Link
                href={"/dashboard/panelAdmin/courses"}
                className={styles["adminPortal__link-buttonEdit"]}
              >
                <Button className={styles["adminPortal__button--courses"]}>
                  Ver <CoursesEyesIcon />
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles["adminPortal__content--resources"]}>
            <h1 className={styles["adminPortal__title--resources"]}>
              Recursos
            </h1>
            <div className={styles["adminPortal__conent-icons--resources"]}>
              <div className={styles["adminPortal__icons--resources"]}>
                <ResourcesFileIcon />
              </div>
              <div className={styles["adminPortal__icons--resources"]}>
                <ResourcesMovieIcon />
              </div>
              <div className={styles["adminPortal__icons--resources"]}>
                <ResourcesImageIcon />
              </div>
              <div className={styles["adminPortal__icons--resources"]}>
                <ResourcesMusicIcon />
              </div>
              <div className={styles["adminPortal__icons--resources"]}>
                <ResourcesBookIcon />
              </div>
            </div>
            <div className={styles["adminPortal__content-button--resources"]}>
              <Link
                href={"/dashboard/panelAdmin/resources"}
                className={styles["adminPortal__link-buttonEdit"]}
              >
                <Button className={styles["adminPortal__button--resources"]}>
                  Ver <CoursesEyesIcon />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
