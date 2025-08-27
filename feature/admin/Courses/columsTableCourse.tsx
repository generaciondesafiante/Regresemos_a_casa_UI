'use client";';
import Icon from "@/shared/components/Icons";
import { Course } from "@/types/admin/courses/allCourses-type";
import { ColumnDef } from "@tanstack/react-table";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { StatusBar } from "@/shared/components/StatusBar";

interface CourseColumnOptions {
  onReloadClick: (course: Course) => void;

}

export const courseColumns = ({
  onReloadClick,
}: CourseColumnOptions): ColumnDef<Course>[] => [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "nameCourse",
    header: "Nombre del curso",
  },
  {
    id: "isActive",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <div style={{ display: "flex", gap: "1rem" }}>
          <StatusBar isActive={row.original.isActive ?? false} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <div style={{ display: "flex", gap: "1rem" }}>
          <div
            onClick={() =>
              router.push(
                `/dashboard/adminPanel/courses/topic/${row.original._id}`
              )
            }
            style={{ cursor: "pointer" }}
          >
            <Icon
              name={"BsGearFill"}
              size={20}
              className={styles["icon--edit"]}
            />
          </div>
          <div
            onClick={() => onReloadClick(row.original)}
            style={{ cursor: "pointer" }}
          >
            <Icon
              name={"TfiReload"}
              size={20}
              color={
                row.original.isActive ? "var(--greenDesafiante)" : "var(--red)"
              }
            />
          </div>
        </div>
      );
    },
  },
];
