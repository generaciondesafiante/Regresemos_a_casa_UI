'use client";';
import Icon from "@/shared/components/Icons";
import { Course } from "@/types/admin/courses/allCourses-type";
import { ColumnDef } from "@tanstack/react-table";
// import styles from "./styles.module.css";
import { StatusBar } from "@/shared/components/StatusBar";
import { resourceResponse } from "@/types/admin/resources/resourcesTable-type";
import { useRouter } from "next/navigation";

interface ResourceColumnOptions {
  onReloadClick: (resource: resourceResponse) => void;
}

export const resourcesColumns = ({
  onReloadClick,
}: ResourceColumnOptions): ColumnDef<resourceResponse>[] => [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Nombre del recurso",
  },
  {
    id: "typeResource",
    header: "Tipo de recurso",
    cell: ({ row }) => {
      return (
        <div style={{ display: "flex", gap: "1rem" }}>
          {row.original.typeResource}
        </div>
      );
    },
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
            //   router.push(
            //     `/dashboard/adminPanel/courses/topic/${row.original._id}`
            //   )
            console.log("editar")
            }
            style={{ cursor: "pointer" }}
          >
            <Icon
              name={"LuPencil"}
              size={20}
            //   className={styles["icon--edit"]}
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
