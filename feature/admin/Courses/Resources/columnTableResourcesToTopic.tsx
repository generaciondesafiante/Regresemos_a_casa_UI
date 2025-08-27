'use client";';
import Icon from "@/shared/components/Icons";
import { ColumnDef } from "@tanstack/react-table";
import { resoucesToTopic } from "@/types/admin/Topics/allTopics-type";

export const columns: ColumnDef<resoucesToTopic>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Nombre del recurso",
  },
  {
    accessorKey: "typeResource",
    header: "Tipo de recurso",
  },

  // {
  //   id: "actions",
  //   header: "Acciones",
  //   cell: ({ row }) => {
  //     const router = useRouter();
  //     return (
  //       <div style={{ display: "flex", gap: "1rem" }}>
  //         <div style={{ cursor: "pointer" }}></div>
  //         <div style={{ display: "flex", gap: "1rem" }}>
  //           <div
  //             onClick={() =>
  //               router.push(
  //                 `/dashboard/adminPanel/courses/resourcesToTopic/${row.original._id}`
  //               )
  //             }
  //             style={{ cursor: "pointer" }}
  //           >
  //             <Icon name={"BsGearFill"} size={20} />
  //           </div>
  //           <Icon
  //             name={"TfiReload"}
  //             size={20}
  //             color={
  //               row.original.isActive ? "var(--greenDesafiante)" : "var(--red)"
  //             }
  //           />
  //         </div>
  //       </div>
  //     );
  //   },
  // },
];
