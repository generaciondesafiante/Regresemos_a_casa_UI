"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { Button, CheckRegisterIcion } from "../../atoms";
import { ModalEditPhotoProfile } from "../Modal/Modal";
import { AddPhotoIcon } from "../../atoms/icons/addPhotoIcon/AddPhotoIcon";
import styles from "./Profile.module.css";
import { uploadFile } from "../../../hooks/useFirebase";

interface Props {
  name?: string | null | undefined;
  lastname?: string | null | undefined;
  email?: string | null | undefined;
  country?: string | null | undefined;
  city?: string | null | undefined;
  phone?: number | null | undefined;
  image?: string | null | undefined;
}

export const Profile: FC<Props> = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData
      ? JSON.parse(storedData)
      : {
          name: session?.user?.name ?? "",
          lastname: session?.user?.lastname ?? "",
          email: session?.user?.email ?? "",
          country: session?.user?.country ?? "",
          city: session?.user?.city ?? "",
          phone: session?.user?.phone ?? "",
          image: session?.user?.image ?? "",
        };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileChange called");
    const files = e.target?.files;
    if (files && files.length > 0) {
      try {
        const id = session?.user?.uid;

        if (id) {
          const result = await uploadFile(files[0], id);

          setFormData((formData) => ({
            ...formData,
            image: result,
          }));

          setFile(files[0]);
        } else {
          console.error("ID is undefined");
        }
      } catch (error) {
        console.log(error);
      }
    }
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
        <div className={styles["profile-container_img"]}>
          <img
            src={formData?.image}
            alt="Imagen de perfil"
            className={styles["profile-user_img"]}
          />
          <div
            className={styles["profile-container_addPhoto"]}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <AddPhotoIcon />
          </div>

          <div>
            <ModalEditPhotoProfile
              openModalProfile={isModalOpen}
              closeModalProfile={() => {
                setIsModalOpen(false);
              }}
              title="Agrega foto de perfil"
            >
              <form
                className={styles["modalEditImg-content"]}
                onSubmit={handleSaveChanges}
              >
                <h3 className={styles["modalEditImg-title"]}>Subir Imagen</h3>

                <div className={styles["custom-file-input"]}>
                  <span className={styles["file-input-label"]}>
                    Seleccionar archivo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className={styles["modalEditImg-inputUploadImage"]}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      handleFileChange(e);
                      setFile(e.target.files![0]);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className={styles["modalEditImg-buttonAccept"]}
                >
                  Guardar cambios
                </button>
              </form>
            </ModalEditPhotoProfile>
          </div>
        </div>
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
              <Button
                className={styles["profile-saveChange_btn"]}
                type={"submit"}
                onClick={handleSaveChanges}
              >
                Guardar Cambios
              </Button>
              <Button
                type={"text"}
                className={`
                ${styles["profile-saveChange_btn"]} 
                ${styles["profile-cancel_btn"]}`}
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>Nombres</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.name || session?.user?.name}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>Apellidos</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.lastname || session?.user?.lastname}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>
                Correo electrónico
              </h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.email || session?.user?.email}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>País</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.country || session?.user?.country}
              </p>
            </div>
            <div className={styles["viewDesktop_profile"]}>
              <h3 className={styles["profile-info_title"]}>Ciudad</h3>
              <p className={styles["profile-user_personalInfo"]}>
                {formData.city || session?.user?.city}
              </p>
            </div>
            <div
              className={styles["viewDesktop_profile"]}
              style={{
                display:
                  formData.phone || session?.user?.phone !== null
                    ? "block"
                    : "none",
              }}
            >
              <h3 className={styles["profile-info_title"]}>Teléfono</h3>
              <p
                className={styles["profile-user_personalInfo"]}
                style={{
                  display:
                    formData.phone || session?.user?.phone !== null
                      ? "block"
                      : "none",
                }}
              >
                {formData.phone || session?.user?.phone}
              </p>
            </div>
            <div className={styles["profile-container_buttons"]}>
              <button
                onClick={() => setIsEditing(true)}
                className={styles["profile-btn"]}
              >
                Editar perfil
              </button>
              <Link href={"/dashboard/profile/changepassword"}>
                <button className={styles["profile-btn"]}>
                  Cambiar contraseña
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
