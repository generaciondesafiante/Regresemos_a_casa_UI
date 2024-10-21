"use client";
import { ArrowBack } from "../../atoms/ArrowBack/ArrowBack";
import { DynamicTable } from "../TableAdmin/TableAdmin";
import { useRouter } from "next/navigation";
import { Column } from "../../../types/types/tableAdmin";
import styles from "./CourseTopicManageAdminPortal.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import AdminPencilIcon from "../../atoms/icons/adminPanel/AdminPencilIcon";
import { selectedResource } from "../../../store/slices/ResourceSlice";
import { selectTopic } from "../../../store/slices/topicsSlice";

const columns: Column[] = [
  { key: "_id", label: "Id" },
  { key: "nameTopic", label: "Nombre del tema" },
];

export const CourseTopicManageAdminPortal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const courseSelected = useAppSelector(
    (state) => state.courses.selectedCourse
  );

  const allTopicsWithinACourse = useAppSelector(
    (state) => state.allTopicsWithACourse.allTopicWithinACourse
  );

  const selectedTopicArray = allTopicsWithinACourse
    ? [Object.values(allTopicsWithinACourse)]
    : [];

  const typeRoute =
    courseSelected?.typeOfRoute === "strict" ? "Estricta" : "Flexible";

  const handleEditClick = (row: any) => {
    const dispatchSelectedResource = row.resources;
    dispatch(selectedResource(dispatchSelectedResource));
    dispatch(selectTopic(row));

    router.push(
      `/dashboard/adminPanel/courses/courseTopicManage/lessonsWithinACourse`
    );
  };

  return (
    <main className={styles["container__coursesAdmin"]}>
      <ArrowBack
        linkBack={"/dashboard/adminPanel/courses"}
        text={"Regresar"}
        colorText={"white"}
        colorHover={"greenDesafiante"}
      />
      <div className={styles["coursesAdmin__title--container"]}>
        <section className={styles["coursesAdmin__title-course--content"]}>
          <h2 className={styles["coursesAdmin__title"]}>
            {courseSelected?.nameCourse}
          </h2>
          <div
            onClick={() => {
              router.push(
                "/dashboard/adminPanel/courses/courseTopicManage/editCourse"
              );
            }}
          >
            <AdminPencilIcon className={styles["title__icon"]} />
          </div>
        </section>
        <p className={styles["coursesAdmin__title--info"]}>
          Título: {courseSelected?.titleCourse}
        </p>
        <p className={styles["coursesAdmin__title--info"]}>Ruta: {typeRoute}</p>
      </div>
      <div className={styles["coursesAdmin__title--table"]}>
        <DynamicTable
          columns={columns}
          rows={selectedTopicArray[0] || []}
          buttonCreateProps={{
            label: "Agregar tema",
            href: `/dashboard/adminPanel/courses/${courseSelected?._id}/createTopicOnCourse`,
          }}
          actionButton={{ label: "Editar", icon: <AdminPencilIcon /> }}
          onEdit={handleEditClick}
        />
      </div>
    </main>
  );
};
