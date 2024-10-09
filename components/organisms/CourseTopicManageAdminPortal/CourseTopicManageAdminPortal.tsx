"use client";
import { useSession } from "next-auth/react";
import { ArrowBack } from "../../atoms/ArrowBack/ArrowBack";
import { DynamicTable } from "../TableAdmin/TableAdmin";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCoursesData } from "../../../services/courses/coursesData";
import { Column, Row } from "../../../types/types/tableAdmin";
import styles from "./CourseTopicManageAdminPortal.module.css";
import { useAppSelector } from "../../../store/store";

const columns: Column[] = [
  { key: "_id", label: "Id" },
  { key: "nameTopic", label: "Nombre del tema" },
];

export const CourseTopicManageAdminPortal = () => {
  const { data: session } = useSession();
  const userId = session?.user.uid;
  const [courseData, setCourseData] = useState<Row[]>([]);
  const router = useRouter();
  const courseSelected = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);

  console.log(selectedTopic);

  //   useEffect(() => {
  //     const dataResource = async () => {
  //       if (userId) {
  //         const data = await fetchCoursesData();
  //         setcourseData(data);
  //       }
  //     };
  //     dataResource();
  //   }, [userId]);

  const handleEditClick = () => {
    // Todo AQui va la ligica para lanazar el dispatch y elegir el curso y los timpos de teams que hay
    // if (resource) {
    //   dispatch(resourceEditAdmin(resource));
    // } else {
    //   Swal.fire(
    //     "Error",
    //     "Error para poder editar el recurso, consulte con el administrador.",
    //     "error"
    //   );
    // }

    router.push(`/dashboard/adminPanel/courses/courseTopicManage`);
  };

  return (
    <main className={styles["container__coursesAdmin"]}>
      <ArrowBack
        linkBack={"/dashboard/adminPanel/courses"}
        text={"Regresar"}
        colorText={"white"}
        colorHover={"greenDesafiante"}
      />

      <h2 className={styles["coursesAdmin__title"]}>
        {courseSelected?.nameCourse}
      </h2>
      <DynamicTable
        columns={columns}
        rows={selectedTopic ? [selectedTopic] : []}
        buttonCreateProps={{
          label: "Agregar tema",
          href: "/dashboard/adminPanel/courses/createCourse",
        }}
        actionButton={{ label: "Editar" }}
        onEdit={handleEditClick}
      />
    </main>
  );
};
