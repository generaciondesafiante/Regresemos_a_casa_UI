"use client";
import { useSession } from "next-auth/react";
import styles from "./EditAdmin.module.css";
import Link from "next/link";
import { ArrowLeftIcon, Button } from "../../atoms";
import IconDeleteBin6Fill from "../../atoms/icons/deleteIcon/DeleteIcon";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import Swal from "sweetalert2";
import { addAdmin } from "../../../services/user/addAdmin";
import { useRouter } from "next/navigation";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";
import { fetchAdmins } from "../../../store/slices/allAdminsSlice";

export const EditAdmin = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const allAdmins = useAppSelector((state) => state.allAdmins.admins);
  const dispatch = useAppDispatch();

  const handleDeleteAdmin = async (
    adminEmail: string,
    name: string,
    lastName: string
  ) => {
    const admin = false;
    const email = adminEmail;
    const id = session?.user.uid || "";
    const fullName =
      name.charAt(0).toUpperCase() +
      name.slice(1).toLowerCase() +
      " " +
      lastName.charAt(0).toUpperCase() +
      lastName.slice(1).toLowerCase();

    try {
      const result = await Swal.fire({
        title: "Estás seguro que deseas eliminar como administrador a:",
        text: `${fullName} (${adminEmail})`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await addAdmin(email, id, admin);
        if (response.status === 200) {
          Swal.fire(
            "Usuario eliminado!",
            response.data.msg ||
              "Rol de administrador actualizado exitosamente",
            "success"
          );
          dispatch(fetchAdmins(id));

          router.push("/dashboard/adminPanel/editAdmin");
        } else {
          Swal.fire(
            "Error!",
            response.data.message || "Administrador no eliminado correctamente",
            "error"
          );
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(
          "Error!",
          error.message || "No se pudo eliminar el administrador",
          "error"
        );
      } else {
        Swal.fire("Error!", "No se pudo eliminar el administrador", "error");
      }
    }
  };
  return (
    <>
      <div
        className={styles["changePasswordUser-returnProfile"]}
        onClick={() => router.push("/dashboard/adminPanel")}
      >
        <ArrowLeftIcon />
        <p>Regresar</p>
      </div>
      <div className={styles["aditAdmin__container--admins"]}>
        <h2 className={styles["editAdmin__title"]}>Editar administradores</h2>
        <div className={styles["adminPanel__content-users--admins"]}>
          {allAdmins && allAdmins.length > 0 ? (
            allAdmins.map((admin, index) => (
              <div
                className={styles["adminPanel__content-infoUser--admins"]}
                key={index}
              >
                <div className={styles["adminPanel__content-infoUser--admins"]}>
                  <img
                    src={admin.image}
                    alt={admin.name}
                    className={styles["adminPanel__image-infoUser--admins"]}
                  />
                  <p className={styles["adminPanel__name-infoUser--admins"]}>
                    {admin.name} {admin.lastname}
                  </p>
                </div>
                <div>
                  <IconDeleteBin6Fill
                    className={styles["adminPanel__deleteIcon"]}
                    onClick={() =>
                      handleDeleteAdmin(admin.email, admin.name, admin.lastname)
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <p className={styles["adminPanel__notFound-user--admins"]}>
              No hay Administradores disponibles
            </p>
          )}
        </div>
        <div className={styles["adminPanel__content-buttonEdit--admins"]}>
          <Link
            href={"/dashboard/adminPanel/editAdmin/addAdmin"}
            className={styles["adminPanel__link-buttonEdit"]}
          >
            <Button className={styles["adminPanel__buttonEdit--admins"]}>
              Agregar
              <AddCircleIcon className={styles["addAdmin__icon"]} />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
