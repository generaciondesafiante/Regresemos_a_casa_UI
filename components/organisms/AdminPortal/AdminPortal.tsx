import React from "react";
import styles from "./AdminPortal.module.css";
import { Button } from "../../atoms";
import AdminPencilIcon from "../../atoms/icons/adminPortal/AdminPencilIcon";
import CoursesEyesIcon from "../../atoms/icons/adminPortal/CoursesEyesIcon";
import ResourcesFileIcon from "../../atoms/icons/adminPortal/ResourcesFileIcon";
import ResourcesMovieIcon from "../../atoms/icons/adminPortal/ResourcesMovieIcon";
import ResourcesImageIcon from "../../atoms/icons/adminPortal/ResourcesImageFill";
import ResourcesMusicIcon from "../../atoms/icons/adminPortal/ResourcesMusicIcon";
import ResourcesBookIcon from "../../atoms/icons/adminPortal/ResourcesBookIcon";
import Link from "next/link";

export const AdminPortal = () => {
  return (
    <main className={styles["adminPortal"]}>
      <div className={styles["adminPortal__container"]}>
        <section className={styles["adminPortal__container--sectionLeft"]}>
          <div className={styles["adminPortal__content--admins"]}>
            <h1 className={styles["adminPortal__title--admins"]}>
              Administradores
            </h1>
            <div className={styles["adminPortal__content-users--admins"]}>
              <div className={styles["adminPortal__content-infoUser--admins"]}>
                <img
                  src="http://somebooks.es/wp-content/uploads/2018/12/Poner-una-imagen-a-la-cuenta-de-usuario-en-Windows-10-000.png"
                  alt=""
                  className={styles["adminPortal__image-infoUser--admins"]}
                />
                <p className={styles["adminPortal__name-infoUser--admins"]}>
                  Lincons Mendoza
                </p>
              </div>
              <div className={styles["adminPortal__content-infoUser--admins"]}>
                <img
                  src="http://somebooks.es/wp-content/uploads/2018/12/Poner-una-imagen-a-la-cuenta-de-usuario-en-Windows-10-000.png"
                  alt=""
                  className={styles["adminPortal__image-infoUser--admins"]}
                />
                <p className={styles["adminPortal__name-infoUser--admins"]}>
                  Lincons Mendoza
                </p>
              </div>
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
              <p>Cantidad de estudiantes 8</p>
            </div>
          </div>
        </section>
        <section className={styles["adminPortal__container--sectionRight"]}>
          <div className={styles["adminPortal__content--courses"]}>
            <h1 className={styles["adminPortal__title--courses"]}>Cursos</h1>
            <div className={styles["adminPortal__conent-courses--courses"]}>
              <p className={styles["adminPortal__course-item--courses"]}>
                Curso básico de capacitacion
              </p>
              <p className={styles["adminPortal__course-item--courses"]}>
                Deuteronomio
              </p>
              <p className={styles["adminPortal__course-item--courses"]}>
                Desafío del amor
              </p>
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
