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

export const ManagementResources = () => {
  const methods = useForm();

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

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <main>
      <h2 className={styles["title__addResource"]}>Agregar recurso</h2>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
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
            name="Descripcion"
            register={methods.register("Descripcion")}
          />

          <CustomSelect
            options={resourceTypeOptions}
            placeholder="Tipo de recurso"
            onSelect={(value) => methods.setValue("tipoRecurso", value)}
          />

          <CustomSelect
            options={visibilityOptions}
            placeholder="Visibilidad"
            onSelect={(value) => methods.setValue("visibilidad", value)}
          />
          <div className={styles["container__input--select"]}>
            <Button className={styles["button__file--input"]}>
              <label className={styles["label-button__file--input"]}>
                Selecciona tu recurso
              </label>
              <input
                type="file"
                accept="*/*"
                className={styles["input__file"]}
                //   onClick={(e) => e.stopPropagation()}
              />
            </Button>
            <span className={styles["name__file--select"]}></span>
          </div>
          <div className={styles["container__input--select"]}>
            <Button className={styles["button__file--input"]}>
              <label className={styles["label-button__file--input"]}>
                Seleccionar miniatura
              </label>
              <input
                type="file"
                accept="image/*"
                className={styles["input__file"]}
                //   onClick={(e) => e.stopPropagation()}
              />
            </Button>
            {/* <div className={styles["thumbnail-preview"]}> */}
              {/* <img
                alt="Vista previa de la miniatura"
                className={styles["thumbnail-image"]}

              /> */}
            {/* </div> */}
          </div>
          <div className={styles["container__buttons--actions"]}>
            <Button className={styles["button__action"]} variant="danger">
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
};
