"use client";
import React, { useEffect, useState } from "react";
import { ArrowBack } from "../../atoms/ArrowBack/ArrowBack";
import styles from "./ResoruceAdmin.module.css";
import { Column } from "../../../types/types/tableAdmin";
import { fetchResourcesData } from "../../../services/resources/resources";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import AdminPencilIcon from "../../atoms/icons/adminPanel/AdminPencilIcon";
import { useRouter } from "next/navigation";
import { resourceEditAdmin } from "../../../store/slices/resourceEditAdminSlice";
import Swal from "sweetalert2";
import { DynamicTable } from "../TableAdmin/TableAdmin";

const columns: Column[] = [
  { key: "_id", label: "Id" },
  { key: "title", label: "Nombre" },
  { key: "typeResource", label: "Tipo" },
];

const actionButton = {
  icon: <AdminPencilIcon />,
  label: "Editar",
};

const dropdownOptions = ["todos", "video", "audio", "pdf", "imagen", "link"];

export const ResourceAdmin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userId = useAppSelector((state) => state.user.userInfo?.uid);

  const [resources, setresources] = useState([]);

  useEffect(() => {
    const dataResource = async () => {
      if (userId) {
        const data = await fetchResourcesData(userId);
        setresources(data.resources);
      }
    };
    dataResource();
  }, [userId]);

  const handleEditClick = (resource: any) => {
    if (resource) {
      dispatch(resourceEditAdmin(resource));
    } else {
      Swal.fire(
        "Error",
        "Error para poder editar el recurso, consulte con el administrador.",
        "error"
      );
    }

    router.push(`/dashboard/adminPanel/resources/editResource/${resource._id}`);
  };

  return (
    <main className={styles["resourceAdmin"]}>
      <ArrowBack
        linkBack={"/dashboard/adminPanel"}
        text={"Regresar"}
        colorText={"white"}
        colorHover={"greenDesafiante"}
      />
      <section className={styles["container__section-table--resourceAdmin"]}>
        <h2 className={styles["title--resourceAdmin"]}>Recursos</h2>
        <DynamicTable
          columns={columns}
          rows={resources}
          actionButton={actionButton}
          dropdownOptions={dropdownOptions}
          dropdownColumnKey="typeResource"
          onEdit={handleEditClick}
          noDataMessage="No hay recursos disponibles. Por favor, agrega nuevos recursos."
        />
      </section>
    </main>
  );
};
