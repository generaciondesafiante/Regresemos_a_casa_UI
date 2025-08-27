'use client";';
import Icon from "@/shared/components/Icons";
import { ColumnDef } from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import { Topic } from "@/types/admin/Topics/allTopics-type";

interface CourseColumnOptions {
  onReloadClick: (course: Topic) => void;
}

export const topicsColumns = ({
  onReloadClick,
}: CourseColumnOptions): ColumnDef<Topic>[] => [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "nameTopic",
    header: "Nombre del tema",
  },

  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const router = useRouter();
      const { idCourse } = useParams();
      return (
        <div style={{ display: "flex", gap: "1rem" }}>
          <div
            onClick={() =>
              router.push(
                `/dashboard/adminPanel/courses/resourcesToTopic/${idCourse}/${row.original._id}`
              )
            }
            style={{ cursor: "pointer" }}
          >
            <Icon name={"BsGearFill"} size={20} />
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
