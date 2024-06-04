"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { fetchAllAdmin } from "../../../services/user/allAdmis";
import { fetAllStudents } from "../../../services/user/allStudents";
import { fetchCoursesData } from "../../../services/courses/coursesData";
import { Button } from "../../atoms";
import AdminPencilIcon from "../../atoms/icons/adminPanel/AdminPencilIcon";
import CoursesEyesIcon from "../../atoms/icons/adminPanel/CoursesEyesIcon";
import ResourcesFileIcon from "../../atoms/icons/adminPanel/ResourcesFileIcon";
import ResourcesMovieIcon from "../../atoms/icons/adminPanel/ResourcesMovieIcon";
import ResourcesImageIcon from "../../atoms/icons/adminPanel/ResourcesImageFill";
import ResourcesMusicIcon from "../../atoms/icons/adminPanel/ResourcesMusicIcon";
import ResourcesBookIcon from "../../atoms/icons/adminPanel/ResourcesBookIcon";
import { Course } from "../../../types/types/course.types";
import styles from "./AdminPanel.module.css";

interface Admin {
  _id: string;
  name: string;
  lastname: string;
  image: string;
}

export const AdminPanel = async () => {
  const { data: session } = useSession();
  const userId = session?.user?.uid || "";
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [allStudents, setAllStudents] = useState(0);
  const [allCourses, setAllCourses] = useState<Course[] | undefined>(undefined);

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
    <main className={styles["adminPanel"]}>
      <div className={styles["adminPanel__container"]}>
        <section className={styles["adminPanel__container--sectionLeft"]}>
          <div className={styles["adminPanel__content--admins"]}>
            <h1 className={styles["adminPanel__title--admins"]}>
              Administradores
            </h1>
            <div className={styles["adminPanel__content-users--admins"]}>
              {admins.length > 0 ? (
                admins.map((admin, index) => (
                  <div
                    className={styles["adminPanel__content-infoUser--admins"]}
                    key={index}
                  >
                    <img
                      src={admin.image}
                      alt={admin.name}
                      className={styles["adminPanel__image-infoUser--admins"]}
                    />
                    <p className={styles["adminPanel__name-infoUser--admins"]}>
                      {admin.name} {admin.lastname}
                    </p>
                  </div>
                ))
              ) : (
                <p className={styles["adminPanel__notFound-user--admins"]}>
                  No hay Administradores disponibles
                </p>
              )}
            </div>
            <div className={styles["adminPanel__content-buttonEdit--admins"]}>
              <Link
                href={"/dashboard/adminPanel/admin"}
                className={styles["adminPanel__link-buttonEdit"]}
              >
                <Button className={styles["adminPanel__buttonEdit--admins"]}>
                  Editar
                  <AdminPencilIcon />
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles["adminPanel__content--students"]}>
            <h1 className={styles["adminPanel__title--students"]}>
              Estudiantes
            </h1>
            <div className={styles["adminPanel__count--students"]}>
              <p>
                Cantidad de estudiantes <b>{allStudents}</b>
              </p>
            </div>
          </div>
        </section>
        <section className={styles["adminPanel__container--sectionRight"]}>
          <div className={styles["adminPanel__content--courses"]}>
            <h1 className={styles["adminPanel__title--courses"]}>Cursos</h1>
            <div className={styles["adminPanel__conent-courses--courses"]}>
              {allCourses && allCourses.length > 0 ? (
                allCourses.map((course, index) => (
                  <p
                    className={styles["adminPanel__course-item--courses"]}
                    key={index}
                  >
                    {course.courseName}
                  </p>
                ))
              ) : (
                <p className={styles["adminPanel__course-notFoud--courses"]}>
                  No hay cursos disponibles.
                </p>
              )}
            </div>
            <div className={styles["adminPanel__content-button--courses"]}>
              <Link
                href={"/dashboard/adminPanel/courses"}
                className={styles["adminPanel__link-buttonEdit"]}
              >
                <Button className={styles["adminPanel__button--courses"]}>
                  Ver <CoursesEyesIcon />
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles["adminPanel__content--resources"]}>
            <h1 className={styles["adminPanel__title--resources"]}>Recursos</h1>
            <div className={styles["adminPanel__conent-icons--resources"]}>
              <div className={styles["adminPanel__icons--resources"]}>
                <ResourcesFileIcon />
              </div>
              <div className={styles["adminPanel__icons--resources"]}>
                <ResourcesMovieIcon />
              </div>
              <div className={styles["adminPanel__icons--resources"]}>
                <ResourcesImageIcon />
              </div>
              <div className={styles["adminPanel__icons--resources"]}>
                <ResourcesMusicIcon />
              </div>
              <div className={styles["adminPanel__icons--resources"]}>
                <ResourcesBookIcon />
              </div>
            </div>
            <div className={styles["adminPanel__content-button--resources"]}>
              <Link
                href={"/dashboard/adminPanel/resources"}
                className={styles["adminPanel__link-buttonEdit"]}
              >
                <Button className={styles["adminPanel__button--resources"]}>
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
