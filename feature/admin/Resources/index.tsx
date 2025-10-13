"use client";
import { ResourcesAdminTables } from "@/shared/services/admin/resources/resources";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useFetchResources } from "./hook/useFetchResource";
import Table from "@/shared/components/Table";
import { resourcesColumns } from "./columnsTableResources";
import { AlertModal, AlertType } from "@/shared/components/ModalAlerts";
import { resourceResponse } from "@/types/admin/resources/resourcesTable-type";

export const ResourcesTable = () => {
  const [alert, setAlert] = useState({
    type: "" as AlertType,
    title: "",
    subtitle: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] =
    useState<resourceResponse | null>(null);

  const { data, loading, error, page, setPage, search, setSearch } =
    useFetchResources(10);

  if (error) return <p>Error al cargar los recursos: {error.message}</p>;

  const handleOpenModal = (resource: resourceResponse) => {
    setSelectedResource(resource);
    setModalOpen(true);
    setAlert({
      type: "warning",
      title: resource.isActive ? "Desactivar" : "Activar",
      subtitle: `¿Estás seguro de que deseas ${
        resource.isActive ? "desactivar" : "activar"
      } el recurso "${resource.title}"?`,
    });
  };

  const columns = resourcesColumns({ onReloadClick: handleOpenModal });

  return (
    <>
      <Table
        labelButton="Agregar recurso"
        title="Recursos"
        data={data?.resources ?? []}
        columns={columns}
        searchable
        filterable
        paginated
        loading={loading}
        totalItems={data?.pagination?.totalCount ?? 0}
        totalPages={data?.pagination?.totalPages ?? 1}
        currentPage={page}
        hasPreviousPage={data?.pagination?.hasPreviousPage ?? false}
        hasNextPage={data?.pagination?.hasNextPage ?? false}
        onPageChange={(newPage) => setPage(newPage)}
        onSearchChange={(value) => {
          setPage(1);
          setSearch(value);
        }}
        navigateRouteButton="/dashboard/adminPanel/resources/createResource"
        placeHolderSearch="Buscar por nombre del recurso o tipo de recurso"
      />
      <AlertModal
        isOpen={modalOpen}
        type="warning"
        title={alert.title}
        subtitle={alert.subtitle}
        primaryButton={{
          text: selectedResource?.isActive
            ? "Desactivar recurso"
            : "Activar recurso",
          onClick: () => {
            console.log("cambiando");
          },
        }}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
