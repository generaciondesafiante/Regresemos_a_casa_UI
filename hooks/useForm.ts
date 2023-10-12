"use client";
import { useEffect, useMemo, useState } from "react";

interface FormField {
  [key: string]: string;
}

interface FormValidation {
  [key: string]: [(value: string) => boolean, string];
}

interface FormResult {
  formState: FormField;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetForm: () => void;
  isFormValid: boolean;
}

export const useForm = (
  initialForm: FormField = {},
  formValidations: FormValidation = {}
): FormResult => {
  const [formState, setFormState] = useState<FormField>(initialForm);
  const [formValidation, setFormValidation] = useState<FormField>({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: FormField = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? ""
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
  };
};
