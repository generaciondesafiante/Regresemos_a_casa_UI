"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
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
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchAdmins } from "../../../store/slices/allAdminsSlice";
import { fetchResourcesData } from "../../../services/resources/resources";
import { allResources } from "../../../store/slices/resourcesByRol";
import { studentsCount } from "../../../store/slices/studentsCountSlice";

export const AdminPanel = () => {
  const { data: session } = useSession();
  const userId = session?.user?.uid || "";
  const dispatch = useAppDispatch();
  const [allStudents, setAllStudents] = useState<number>(0);
  const [allCourses, setAllCourses] = useState<Course[] | undefined>(undefined);
  const { admins, loading, error } = useAppSelector((state) => state.allAdmins);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAdmins(userId));
    }

    const fetchData = async () => {
      try {
        const allStudentsCount = await fetAllStudents(userId);
        if (typeof allStudentsCount === "number" && allStudentsCount > 0) {
          dispatch(studentsCount(allStudentsCount));
          setAllStudents(allStudentsCount);
        }

        const coursesData = await fetchCoursesData();
        if (coursesData) {
          setAllCourses(coursesData.slice(0, 4));
        }

        const resourceData = await fetchResourcesData(userId);
        if (resourceData) {
          dispatch(allResources(resourceData.resources));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, userId]);

  return (
    <main className={styles["adminPanel"]}>
      <div className={styles["adminPanel__container"]}>
        <section className={styles["adminPanel__container--sectionLeft"]}>
          <div className={styles["adminPanel__content--admins"]}>
            <h1 className={styles["adminPanel__title--admins"]}>
              Administradores
            </h1>
            <div className={styles["adminPanel__content-users--admins"]}>
              {loading ? (
                <p>Loading admins...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : admins && admins.length > 0 ? (
                admins.slice(0, 3).map((admin, index) => (
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
                href={"/dashboard/adminPanel/editAdmin"}
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
                allCourses.slice(0, 3).map((course, index) => (
                  <p
                    className={styles["adminPanel__course-item--courses"]}
                    key={index}
                  >
                    {course.nameCourse}
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
