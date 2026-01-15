"use client";
import styles from "./styles.module.css";
import { Input } from "@/shared/components/Input/Input";
import Button from "@/shared/components/Button/Button";
import {
  TypeResource,
  Visibility,
} from "@/types/admin/resources/resource-type";
import { TextareaField } from "@/shared/components/TextArea";
import { CustomSelect } from "@/shared/components/CustomSelect";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { Register } from "../../../../components/organisms/Register/Register";
import { useParams, useRouter } from "next/navigation";
import { uploadFileSingle } from "@/services/uploadFiles/uploadFileSingle";
import { useSession } from "next-auth/react";
import { addResource } from "@/services/resources/createResource";
import { AlertModal } from "@/shared/components/ModalAlerts";

export const ManagementResources = () => {
  const { data: session } = useSession();
  const userId = session?.user?.uid;
  const params = useParams();
  const router = useRouter(); // Inicializar router
  const idParams = params.id;
  console.log(idParams);

  const methods = useForm({
    defaultValues: {
      titulo: "",
      descripcion: "",
      tipoRecurso: "",
      visibilidad: "",
      recurso: null as FileList | null,
      miniatura: null as FileList | null,
    },
  });
  const [resourceFileName, setResourceFileName] = useState<string>("");
  const [thumbnailFileName, setThumbnailFileName] = useState<string>("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const resourceTypeOptions = [
    { value: TypeResource.VIDEO, label: "Video" },
    { value: TypeResource.AUDIO, label: "Audio" },
    { value: TypeResource.IMAGE, label: "Imagen" },
    { value: TypeResource.LINK, label: "Enlace" },
    { value: TypeResource.PDF, label: "PDF" },
  ];

  const visibilityOptions = [
    { value: Visibility.PUBLIC, label: "Público" },
    { value: Visibility.ONLY_COURSE, label: "Visible en los para un curso" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    type: "success" as "success" | "error" | "warning",
    title: "",
    subtitle: "",
    primaryButton: { text: "Aceptar", onClick: () => setShowAlert(false) },
  });

  const closeAlert = () => {
    setShowAlert(false);
    if (alert.type === "success") {
      router.push("/dashboard/adminPanel/resources");
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const resourceFile = data.recurso?.[0];
      const thumbnailFile = data.miniatura?.[0];

      if (!resourceFile || !thumbnailFile) {
        setAlert({
          type: "warning",
          title: "Archivos faltantes",
          subtitle: "Por favor selecciona ambos archivos: recurso y miniatura.",
          primaryButton: { text: "Entendido", onClick: closeAlert },
        });
        setShowAlert(true);
        setIsLoading(false);
        return;
      }

      if (!userId) {
        setAlert({
          type: "error",
          title: "Error de sesión",
          subtitle:
            "No se pudo identificar al usuario. Por favor inicie sesión nuevamente.",
          primaryButton: { text: "Cerrar", onClick: closeAlert },
        });
        setShowAlert(true);
        setIsLoading(false);
        return;
      }

      // 1. Subir archivo de recurso
      const resourceUpload = await uploadFileSingle(resourceFile, "resources");

      if (resourceUpload?.status !== 200 || !resourceUpload.data?.success) {
        throw new Error("Error al subir el archivo del recurso");
      }

      const resourceData = resourceUpload.data;

      // 2. Subir miniatura (solo si el primero fue exitoso)
      const thumbnailUpload = await uploadFileSingle(
        thumbnailFile,
        "thumbnails"
      );

      if (thumbnailUpload?.status !== 200 || !thumbnailUpload.data?.success) {
        throw new Error("Error al subir la miniatura");
      }

      const thumbnailData = thumbnailUpload.data;

      // 3. Crear el recurso en la base de datos
      const result = await addResource(
        userId,
        { url: resourceData.url, publicId: resourceData.publicId },
        data.titulo,
        data.descripcion,
        data.tipoRecurso,
        data.visibilidad,
        { url: thumbnailData.url, publicId: thumbnailData.publicId }
      );

      if (result.status === 200 || result.status === 201) {
        setAlert({
          type: "success",
          title: "¡Éxito!",
          subtitle: "Recurso guardado exitosamente",
          primaryButton: {
            text: "Aceptar",
            onClick: () => {
              setShowAlert(false);
              router.push("/dashboard/adminPanel/resources");
            },
          },
        });
        setShowAlert(true);
        // Opcional: Redirigir o limpiar formulario
      } else {
        throw new Error(result.data?.message || "Error al guardar el recurso");
      }
    } catch (error: any) {
      console.error("Error en el proceso:", error);
      setAlert({
        type: "error",
        title: "Error",
        subtitle: error.message || "Ocurrió un error al procesar la solicitud.",
        primaryButton: { text: "Cerrar", onClick: closeAlert },
      });
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h2 className={styles["title__addResource"]}>
        {idParams ? "Editar recurso" : "Agregar recurso"}
      </h2>
      <FormProvider {...methods}>
        <form
          className={styles.form}
          onSubmit={methods.handleSubmit(onSubmit, (errors) =>
            console.log("Errores de validación:", errors)
          )}
        >
          <Input
            label="Título"
            name="titulo"
            type="text"
            required={true}
            placeholder=""
            labelColor="var(--white)"
            inputColor="var(--white)"
            borderColor={"var(--turquoise)"}
            register={methods.register("titulo", {
              required: "El título es requerido",
            })}
          />
          <TextareaField
            label="Descripción"
            name="descripcion"
            register={methods.register("descripcion")}
          />

          <CustomSelect
            options={resourceTypeOptions}
            placeholder="Tipo de recurso"
            // name="tipoRecurso"
            register={methods.register("tipoRecurso")}
          />

          <CustomSelect
            options={visibilityOptions}
            placeholder="Visibilidad"
            // name="visibilidad"
            register={methods.register("visibilidad")}
          />
          <div className={styles["container__input--select"]}>
            <Button
              className={styles["button__file--input"]}
              disabled={isLoading}
            >
              <label className={styles["label-button__file--input"]}>
                Selecciona tu recurso
              </label>
              {(() => {
                const { onChange: onResourceChange, ...resourceRegister } =
                  methods.register("recurso", {
                    required: "El recurso es requerido",
                  });
                return (
                  <input
                    type="file"
                    accept="*/*"
                    className={styles["input__file"]}
                    disabled={isLoading}
                    {...resourceRegister}
                    onChange={(e) => {
                      onResourceChange(e); // Notify RHF
                      const file = e.target.files?.[0];
                      if (file) {
                        setResourceFileName(file.name);
                        // No need for manual setValue since RHF handles it via onResourceChange
                      }
                    }}
                  />
                );
              })()}
            </Button>
            <span className={styles["name__file--select"]}>
              {resourceFileName && resourceFileName}
            </span>
          </div>
          <div className={styles["container__input--select"]}>
            <Button
              className={styles["button__file--input"]}
              disabled={isLoading}
            >
              <label className={styles["label-button__file--input"]}>
                Seleccionar miniatura
              </label>
              {(() => {
                const { onChange: onThumbnailChange, ...thumbnailRegister } =
                  methods.register("miniatura", {
                    required: "La miniatura es requerida",
                  });
                return (
                  <input
                    type="file"
                    accept="image/*"
                    className={styles["input__file"]}
                    disabled={isLoading}
                    {...thumbnailRegister}
                    onChange={(e) => {
                      onThumbnailChange(e); // Notify RHF
                      const file = e.target.files?.[0];
                      if (file) {
                        setThumbnailFileName(file.name);
                        // Limpiar la URL previa si existe
                        if (thumbnailPreview) {
                          URL.revokeObjectURL(thumbnailPreview);
                        }
                        // Crear nueva URL de vista previa
                        const previewUrl = URL.createObjectURL(file);
                        setThumbnailPreview(previewUrl);
                      }
                    }}
                  />
                );
              })()}
            </Button>
            {/* <span className={styles["name__file--select"]}>
              {thumbnailFileName && thumbnailFileName}
            </span> */}
            {thumbnailPreview && (
              <div className={styles["thumbnail-preview"]}>
                <img
                  src={thumbnailPreview}
                  alt="Vista previa de la miniatura"
                  className={styles["thumbnail-image"]}
                />
              </div>
            )}
          </div>
          <div className={styles["container__buttons--actions"]}>
            <Button
              className={styles["button__action"]}
              variant="danger"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : idParams ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </form>
      </FormProvider>
      <AlertModal
        isOpen={showAlert}
        onClose={closeAlert}
        type={alert.type}
        title={alert.title}
        subtitle={alert.subtitle}
        primaryButton={alert.primaryButton}
      />
    </main>
  );
};
