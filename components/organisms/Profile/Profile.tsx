"use client";
import { FC, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Swal from "sweetalert2";
import { ModalEditPhotoProfile } from "../Modal/Modal";
import styles from "./Profile.module.css";

interface Props {
  name?: string | null | undefined;
  lastname?: string | null | undefined;
  email?: string | null | undefined;
  country?: string | null | undefined;
  city?: string | null | undefined;
  phone?: number | null | undefined;
}

export const Profile: FC<Props> = () => {
  const { data: session } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: session?.user?.name ?? "",
    lastname: session?.user?.lastname ?? "",
    email: session?.user?.email ?? "",
    country: session?.user?.country ?? "",
    city: session?.user?.city ?? "",
    phone: session?.user?.phone ?? "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/edit-profile/${session?.user?.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Datos actualizados correctamente",
          text: "Dato/s actualizados",
        });
      } else {
        // Maneja errores del servidor
        Swal.fire({
          icon: "success",
          title: "No se han actualizado correctamente los datos",
          text: "No se actualizaron los datos",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profileContainer-title_img"]}>
        <h2 className={styles["profile-title"]}>Información personal</h2>
        {/* -------------MODAL EDIT PHOTO PROFILE -------------*/}
        <div className={styles["profile-container_img"]}>
          <img
            src={session?.user?.image || "URL_DE_IMAGEN_POR_DEFECTO"}
            alt="Imagen de perfil"
            className={styles["profile-user_img"]}
          />
          <div
            className={styles["profile-container_addPhoto"]}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <AddAPhotoIcon
              className={styles["profile-add-photo_icon"]}
              onClick={handleOpenModal}
            />
          </div>

          <div>
            <ModalEditPhotoProfile
              openModalProfile={isModalOpen}
              closeModalProfile={() => {
                setIsModalOpen(false);
              }}
              title="Agrega foto de perfil"
            >
              <form className={styles["modalEditImg-content"]}>
                <h3 className={styles["modalEditImg-title"]}>Subir Imagen</h3>

                <div className={styles["custom-file-input"]}>
                  <span className={styles["file-input-label"]}>
                    {/* {selectedFile
                      ? `Has seleccionado el archivo: ${selectedFile.name}`
                      : "Seleccionar archivo"} */}
                    Seleccionar archivo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className={styles["modalEditImg-inputUploadImage"]}
                    // onChange={(e) => {
                    //   handleInputChange(e);
                    //   setSelectedFile(e.target.files[0]);
                    // }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <button
                  // onClick={(e) => {
                  //   handleSaveChanges(e);
                  //   handleFileChange(e);
                  // }}
                  className={styles["modalEditImg-buttonAccept"]}
                >
                  Guardar cambios
                </button>
              </form>
            </ModalEditPhotoProfile>
          </div>
        </div>
        {/* -------------------- CLOSE MODAL EDIT PHOTO PROFILE------------------------- */}
      </div>

      <div className={styles["profile-container_info"]}>
        {isEditing ? (
          <div className={styles["profile-content_editInformation"]}>
            <h3 className={styles["profile-info_title"]}>Nombres</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <h3 className={styles["profile-info_title"]}>Apellidos</h3>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <h3 className={styles["profile-info_title"]}>Correo electrónico</h3>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <h3 className={styles["profile-info_title"]}>País</h3>
            <input
              type="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <h3 className={styles["profile-info_title"]}>Ciudad</h3>
            <input
              type="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <h3 className={styles["profile-info_title"]}>Teléfono</h3>
            <input
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles["profile-input_editInfromation"]}
            />
            <div className={styles["container-buttons"]}>
              <button
                onClick={handleSaveChanges}
                className={styles["profile-saveChange_btn"]}
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`
                ${styles["profile-saveChange_btn"]} 
                ${styles["profile-cancel_btn"]}`}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>Nombres</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.name}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>Apellidos</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {" "}
                {formData.lastname}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>
                Correo electrónico
              </h3>
              <p className={styles["profile-user_personalInfo"]}>
                {" "}
                {formData.email}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>País</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {" "}
                {formData.country}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>Ciudad</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {" "}
                {formData.city}
              </p>
            </div>
            <div
              className={styles["viewDesktop_profile"]}
              style={{ display: formData.phone !== null ? "block" : "none" }}
            >
              <h3 className={styles["profile-info_title"]}>Teléfono</h3>
              <p
                className={styles["profile-user_personalInfo"]}
                style={{
                  display: formData.phone !== null ? "block" : "none",
                }}
              >
                {formData.phone}
              </p>
            </div>
            <div className={styles["profile-container_buttons"]}>
              <button
                onClick={() => setIsEditing(true)}
                className={styles["profile-btn"]}
              >
                Editar perfil
              </button>
              <button
                className={styles["profile-btn"]}
                // onClick={() => navigateChangePassword()}
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};