"use client";
import { TextareaHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./styles.module.css";
import clsx from "clsx";

interface TextareaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

export const TextareaField = ({
  name,
  label,
  register,
  error,
  ...rest
}: TextareaFieldProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <textarea
        id={name}
        {...register}
        className={clsx(styles.textarea, {
          [styles.errorBorder]: !!error,
        })}
        {...rest}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
