'use client";'
import Icon from "@/shared/components/Icons";
import { Course } from "@/types/admin/courses/allCourses-type";
import { ColumnDef } from "@tanstack/react-table";
import styles from "./styles.module.css";
// import Router from "next/navigation";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "nameCourse",
    header: "Nombre del curso",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      // const course = row.original;
      const router = useRouter();
      return (
        <div style={{ display: "flex", gap: "1rem" }}>
          <div
            onClick={() =>
              router.push(
                `/dashboard/adminPanel/courses/updateCourse/${row.original._id}`
              )
            }
            style={{ cursor: "pointer" }}
          >
            <Icon
              name={"LuPencil"}
              size={20}
              className={styles["icon--edit"]}
            />
          </div>
          <div
            onClick={() => console.log("Eliminar")}
            style={{ cursor: "pointer" }}
          >
            <Icon name={"LuTrash"} size={20} color="red" />
          </div>
        </div>
      );
    },
  },
];
