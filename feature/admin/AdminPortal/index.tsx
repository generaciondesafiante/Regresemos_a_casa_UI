"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { AdminPanel as AdminPanelType } from "@/types/admin/dashboardAdmin";

import { dashboardAdminService } from "@/shared/services/admin/adminsDashboard";
import Icon from "@/shared/components/Icons";
import Text from "@/shared/components/Text";
import Button from "@/shared/components/Button/Button";

import { SkeletonCard } from "./SkeletonCard";
import { resourceIcons } from "./utils/iconsResources";
import styles from "./AdminPanel.module.css";

export const AdminPanel = () => {
  const { data: session } = useSession();
  const userId = session?.user?.uid;
  const router = useRouter(); // Placeholder for router
  const [dashboardAdmin, setDashboardAdmin] = useState<AdminPanelType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = async () => {
      setIsLoading(true);
      setDashboardAdmin(null);
      if (userId) {
        try {
          const fetchDataAdmin = await dashboardAdminService.getDashboardAdmin(
            userId
          );
          setIsLoading(false);
          setDashboardAdmin(fetchDataAdmin);
        } catch (error) {
          console.error("Error fetching dashboard admin data:", error);
          setIsLoading(false);
          setDashboardAdmin(null);
        }
      }
    };
    data();
  }, [userId]);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <main className={styles["adminPanel"]}>
      <div className={styles["adminPanel__container"]}>
        {/* Admins */}
        {isLoading ? (
          <SkeletonCard backgroundColor="var(--gray)" />
        ) : (
          <section
            className={styles["adminPanel__content--cards"]}
            style={{ backgroundColor: "var(--gray)" }}
          >
            <Text variant="h2" color="darkBlue" bold>
              Administradores
            </Text>
            <div className={styles["adminPanel__content-users--admins"]}>
              {dashboardAdmin?.admins.latestAdmins ? (
                dashboardAdmin?.admins.latestAdmins.map((admin) => (
                  <div
                    key={admin?.id}
                    className={styles["adminPanel__user--admins"]}
                  >
                    <Text color="darkBlue" variant="body" bold>
                      {admin.name} {admin.email}
                    </Text>
                  </div>
                ))
              ) : (
                <Text color="darkBlue" variant="body" bold>
                  No hay Administradores disponibles
                </Text>
              )}
            </div>
            <div className={styles["adminPanel__content-buttonEdit--cards"]}>
              <Button
                icon="LuPencil"
                iconPosition="right"
                onClick={() => navigateTo("/dashboard/adminPanel/editAdmin")}
              >
                Editar
              </Button>
            </div>
          </section>
        )}
        {/* Cursos */}
        {isLoading ? (
           <SkeletonCard backgroundColor="var(--darkBlue)" />
        ) : (
          <section
            className={styles["adminPanel__content--cards"]}
            style={{ backgroundColor: "var(--darkBlue)" }}
          >
            <Text variant="h2" color="white" bold>
              Cursos
            </Text>
            <div className={styles["adminPanel__conent-courses--courses"]}>
              {dashboardAdmin?.latestCourses ? (
                dashboardAdmin?.latestCourses.map((course) => (
                  <div key={course.id}>
                    <Text color="white" bold>
                      {course.nameCourse}
                    </Text>
                  </div>
                ))
              ) : (
                <Text color="white" bold align="center">
                  No hay cursos disponibles.
                </Text>
              )}
            </div>
            <div className={styles["adminPanel__content-buttonEdit--cards"]}>
              <Button
                icon="LuPencil"
                iconPosition="right"
                onClick={() => navigateTo("/dashboard/adminPanel/courses")}
              >
                Editar
              </Button>
            </div>
          </section>
        )}
        {/* Estudiantes */}
        {isLoading ? (
         <SkeletonCard backgroundColor="var(--turquoise)" />
        ) : (
          <section
            className={styles["adminPanel__content--cards"]}
            style={{ backgroundColor: "var(--turquoise)" }}
          >
            <Text variant="h2" color="darkBlue" bold>
              Estudiantes
            </Text>
            <div className={styles["adminPanel__count--data"]}>
              <Text color="darkBlue" variant="body">
                Cantidad de estudiantes <b>{dashboardAdmin?.totalStudents}</b>
              </Text>
            </div>
          </section>
        )}
        {/* Recursos */}
        {isLoading ? (
          <SkeletonCard backgroundColor="var(--yellow)" />
        ) : (
          <section
            className={styles["adminPanel__content--cards"]}
            style={{ backgroundColor: "var(--yellow)" }}
          >
            <Text variant="h2" color="darkBlue" bold>
              Recursos
            </Text>
            <div className={styles["adminPanel__conent-icons--resources"]}>
              {resourceIcons.map((iconName) => (
                <div key={iconName}>
                  <Icon name={iconName} size={42} color="var(--darkBlue)" />
                </div>
              ))}
            </div>
            <div className={styles["adminPanel__count--data"]}>
              <Text color="darkBlue" variant="body">
                Cantidad de recursos <b>{dashboardAdmin?.totalResources}</b>
              </Text>
            </div>
            <div className={styles["adminPanel__content-buttonEdit--cards"]}>
              <Button
                icon="LuEye"
                iconPosition="right"
                onClick={() => navigateTo("/dashboard/adminPanel/resources")}
              >
                Editar
              </Button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
