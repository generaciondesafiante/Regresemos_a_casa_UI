"use client";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import styles from "./AddOrEditResource.module.css";
import { Button, Input } from "../../atoms";
import { uploadResourceAndThumbnail } from "../../../hooks/useFirebaseCreateResource";
import { addResource } from "../../../services/resources/createResource";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "../../../store/store";
import { Resource } from "../../../types/types/Resources";
import { aditResource } from "../../../services/resources/editResource";
import AddCircleIcon from "../../atoms/icons/adminPanel/AddCircleIcon";
import IconDeleteBin6Fill from "../../atoms/icons/deleteIcon/DeleteIcon";
import { deleteResource } from "../../../services/resources/deleteResource";

export const AddResource = () => {
  const { data: session } = useSession();
  const { idResource } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [resourceType, setResourceType] = useState<string>("tipo de recurso");
  const [visibility, setVisibility] = useState<string>("public");
  const [selectedResourceFile, setSelectedResourceFile] = useState<File | null>(
    null
  );
  const [selectedThumbnailFile, setSelectedThumbnailFile] =
    useState<File | null>(null);
  const resourceFileInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailFileInputRef = useRef<HTMLInputElement | null>(null);

  const infoEditResource: Resource | null = useAppSelector(
    (state) => state.resourceEditAdmin.resourceEditAdmin
  );

  useEffect(() => {
    if (idResource && infoEditResource) {
      if (infoEditResource._id === idResource) {
        setTitle(infoEditResource.title || "");
        setDescription(infoEditResource.description || "");
        setResourceType(infoEditResource.typeResource || "tipo de recurso");
        setVisibility(infoEditResource.visibility || "public");
      }
    }
  }, [idResource, infoEditResource]);

  const handleResourceFileButtonClick = () => {
    if (resourceFileInputRef.current) {
      resourceFileInputRef.current.click();
    }
  };

  const handleThumbnailFileButtonClick = () => {
    if (thumbnailFileInputRef.current) {
      thumbnailFileInputRef.current.click();
    }
  };

  const handleResourceFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedResourceFile(file);
    }
  };

  const handleThumbnailFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThumbnailFile(file);
    }
  };

  const hasChanges = () => {
    return (
      title !== infoEditResource?.title ||
      description !== infoEditResource?.description ||
      resourceType !== infoEditResource?.typeResource ||
      visibility !== infoEditResource?.visibility ||
      (selectedResourceFile !== null &&
        selectedResourceFile.name !== infoEditResource?.resourceUrl) ||
      (selectedThumbnailFile !== null &&
        selectedThumbnailFile.name !== infoEditResource?.miniaturaUrl)
    );
  };

  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      description.trim() !== "" &&
      resourceType !== "tipo de recurso" &&
      visibility !== "" &&
      (selectedResourceFile !== null || (infoEditResource && idResource))
    );
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setResourceType("video");
    setVisibility("public");
    setSelectedResourceFile(null);
    setSelectedThumbnailFile(null);

    if (resourceFileInputRef.current) {
      resourceFileInputRef.current.value = "";
    }
    if (thumbnailFileInputRef.current) {
      thumbnailFileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = session?.user.uid;

    if (!userId) {
      Swal.fire(
        "Error",
        "El ID de usuario no está definido. Por favor, inicia sesión.",
        "error"
      );
      return;
    }
    const allowedTypes = ["video", "audio", "image", "pdf", "link"];
    const allowedVisibility = [
      "private",
      "visibleForward",
      "public",
      "restrictedIncourse",
    ];

    if (!allowedTypes.includes(resourceType)) {
      Swal.fire(
        "Error",
        `Tipo de recurso no válido. Debe ser uno de: ${allowedTypes.join(
          ", "
        )}.`,
        "error"
      );
      return;
    }

    if (!allowedVisibility.includes(visibility)) {
      Swal.fire(
        "Error",
        `Tipo de visibilidad no válido. Debe ser uno de: ${allowedVisibility.join(
          ", "
        )}.`,
        "error"
      );
      return;
    }

    if (selectedResourceFile && selectedThumbnailFile) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Vas a guardar este recurso",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, guardarlo",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "var(--turquoise)",
        cancelButtonColor: "var(--red)",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { resourceUrl, thumbnailUrl } =
              await uploadResourceAndThumbnail(
                selectedResourceFile,
                selectedThumbnailFile,
                title
              );

            const response = await addResource(
              userId,
              resourceUrl,
              title,
              description,
              resourceType,
              visibility,
              thumbnailUrl || ""
            );
            if (response.status === 201) {
              Swal.fire(
                "¡Éxito!",
                "El recurso se ha creado correctamente.",
                "success"
              );
              setTitle("");
              setDescription("");
              setResourceType("video");
              setVisibility("public");
              setSelectedResourceFile(null);
              setSelectedThumbnailFile(null);

              if (resourceFileInputRef.current) {
                resourceFileInputRef.current.value = "";
              }
              if (thumbnailFileInputRef.current) {
                thumbnailFileInputRef.current.value = "";
              }
              resetForm();
            } else {
              Swal.fire(
                "Error",
                "Hubo un problema al crear el recurso.",
                "error"
              );
            }
          } catch (error) {
            Swal.fire(
              "Error",
              "Hubo un problema al subir o crear el recurso.",
              "error"
            );
          }
        }
      });
    }
    const idResourceString = Array.isArray(idResource)
      ? idResource[0]
      : idResource;
    if (infoEditResource && idResourceString && hasChanges()) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Vas a editar este recurso",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, editar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let resourceUrl = infoEditResource.resourceUrl;
            let thumbnailUrl = infoEditResource.miniaturaUrl || "";

            if (selectedResourceFile && selectedThumbnailFile) {
              const uploadResult = await uploadResourceAndThumbnail(
                selectedResourceFile,
                selectedThumbnailFile,
                title
              );
              resourceUrl = uploadResult.resourceUrl;
              thumbnailUrl = uploadResult.thumbnailUrl || "";
            }

            const resourceData = {
              resourceUrl,
              title,
              description,
              typeResource: resourceType,
              visibility,
              miniaturaUrl: thumbnailUrl,
            };

            const response = await aditResource(
              userId,
              idResourceString,
              resourceData
            );
            if (response.status === 200) {
              Swal.fire(
                "¡Éxito!",
                "El recurso se ha editado correctamente.",
                "success"
              );
              setTitle("");
              setDescription("");
              setResourceType("video");
              setVisibility("public");
              setSelectedResourceFile(null);
              setSelectedThumbnailFile(null);

              if (resourceFileInputRef.current) {
                resourceFileInputRef.current.value = "";
              }
              if (thumbnailFileInputRef.current) {
                thumbnailFileInputRef.current.value = "";
              }
              resetForm();
            } else {
              Swal.fire(
                "¡Éxito!",
                "El recurso se ha eliminado correctamente.",
                "success"
              );
            }
          } catch (error) {
            Swal.fire(
              "Error",
              "Hubo un problema al subir o editar el recurso.",
              "error"
            );
            return;
          }
        }
      });
    }
  };

  const handleDeleteResource = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--turquoise)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (idResource && session?.user?.uid) {
          try {
            const deleteData = await deleteResource(
              session?.user?.uid || "",
              idResource.toString()
            );
            if (deleteData.status === 200) {
              Swal.fire(
                "¡Eliminado!",
                "El recurso ha sido eliminado exitosamente.",
                "success"
              );
            }
            return router.push("/dashboard/adminPanel/resources");
          } catch (error) {
            Swal.fire(
              "Error",
              "Ocurrió un error al intentar eliminar el recurso.",
              "error"
            );
          }
        } else {
          Swal.fire(
            "Error",
            "La información requerida para eliminar el recurso no es suficiente.",
            "error"
          );
        }
      } else {
        Swal.fire("Cancelado", "El recurso no fue eliminado", "info");
      }
    });
  };

  return (
    <main>
      <h2 className={styles["title__addResource"]}>
        {infoEditResource && idResource ? "Editar recurso" : "Agregar recurso"}
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder=""
          labelColor="var(--white)"
          inputColor="var(--white)"
          borderColor={"var(--turquoise)"}
        />
        <Input
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="textArea"
          placeholder=""
          labelColor="var(--white)"
          inputColor="var(--white)"
          borderColor={"var(--turquoise)"}
        />
        <div className={styles["container__input"]}>
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            className={styles.inputOptions}
          >
            <option
              value="tipo de recurso"
              className={styles["input__option__select"]}
            >
              Tipo de recurso
            </option>
            <option value="video" className={styles["input__option__select"]}>
              Video
            </option>
            <option value="audio" className={styles["input__option__select"]}>
              Audio
            </option>
            <option value="imagen" className={styles["input__option__select"]}>
              Imagen
            </option>
            <option value="enlace" className={styles["input__option__select"]}>
              Enlace
            </option>
            <option value="pdf" className={styles["input__option__select"]}>
              PDF
            </option>
          </select>
        </div>

        <div className={styles["container__input"]}>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className={styles.inputOptions}
          >
            <option value="public" className={styles["input__option__select"]}>
              Público
            </option>
            <option value="private" className={styles["input__option__select"]}>
              Privado
            </option>
          </select>
        </div>

        <div className={styles["container__input--select"]}>
          <Button
            onClick={handleResourceFileButtonClick}
            className={styles["button__file--input"]}
          >
            {infoEditResource && idResource ? (
              <label className={styles["label-button__file--input"]}>
                Editar Recurso
              </label>
            ) : (
              <label className={styles["label-button__file--input"]}>
                Selecciona tu recurso
              </label>
            )}

            <input
              type="file"
              accept="*/*"
              ref={resourceFileInputRef}
              className={styles["input__file"]}
              onClick={(e) => e.stopPropagation()}
              onChange={handleResourceFileChange}
            />
          </Button>
          {infoEditResource && idResource ? (
            <span className={styles["name__file--select"]}>
              {infoEditResource.resourceUrl}
            </span>
          ) : (
            selectedResourceFile && (
              <span className={styles["name__file--select"]}>
                {selectedResourceFile.name}
              </span>
            )
          )}
        </div>

        <div className={styles["container__input--select"]}>
          <Button
            onClick={handleThumbnailFileButtonClick}
            className={styles["button__file--input"]}
          >
            {infoEditResource && idResource ? (
              <label className={styles["label-button__file--input"]}>
                Editar Miniatura
              </label>
            ) : (
              <label className={styles["label-button__file--input"]}>
                Seleccionar Miniatura
              </label>
            )}

            <input
              type="file"
              accept="image/*"
              ref={thumbnailFileInputRef}
              className={styles["input__file"]}
              onClick={(e) => e.stopPropagation()}
              onChange={handleThumbnailFileChange}
            />
          </Button>
          {infoEditResource && idResource ? (
            <div className={styles["thumbnail-preview"]}>
              <img
                src={infoEditResource.miniaturaUrl}
                alt="Vista previa de la miniatura"
                className={styles["thumbnail-image"]}
              />
            </div>
          ) : (
            selectedThumbnailFile && (
              <div className={styles["thumbnail-preview"]}>
                <img
                  src={URL.createObjectURL(selectedThumbnailFile)}
                  alt="Vista previa de la miniatura"
                  className={styles["thumbnail-image"]}
                />
              </div>
            )
          )}
        </div>

        <div className={styles["container__buttons--actions"]}>
          <Button
            type="button"
            className={styles["button__action--delete"]}
            onClick={() => router.back()}
          >
            Cancelar
          </Button>

          {infoEditResource && idResource ? (
            <Button
              type="button"
              className={styles["button__action--delete"]}
              onClick={() => handleDeleteResource()}
            >
              Eliminar
              <IconDeleteBin6Fill
                className={styles["addAdmin__icon--delete"]}
              />
            </Button>
          ) : null}

          <Button
            type="submit"
            disabled={!isFormValid() || !hasChanges()}
            className={styles["button__action--save"]}
          >
            {infoEditResource && idResource ? "Actualizar Recurso" : "Guardar"}
            <AddCircleIcon className={styles["addAdmin__icon"]} />
          </Button>
        </div>
      </form>
    </main>
  );
};
