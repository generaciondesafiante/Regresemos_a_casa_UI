"use client";
import { FC, useEffect } from "react";
import { Input } from "@/shared/components/Input/Input";
interface RegisterFormInformationProps {
  onInputChange: () => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<number | undefined>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  lastname: string;
  country: string;
  city: string;
  phone?: number | null;
  email: string;
}
export const RegisterFormInformation: FC<RegisterFormInformationProps> = ({
  onInputChange,
  setLastName,
  setName,
  setCountry,
  setCity,
  setPhone,
  setEmail,
  email,
  name,
  lastname,
  country,
  city,
  phone,
}) => {
  useEffect(() => {
    onInputChange();
  }, [name, lastname, country, city, phone, email]);
  return (
    <>
      <Input
        id={"name-form-register"}
        htmlForm={"name-form-register"}
        name="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          onInputChange();
        }}
        type="text"
        placeholder=" "
        label={"Nombres"}
        required={true}
        inputColor="var(--white)"
        borderColor="var(--turquoise)"
        labelColor="var(--white)"
      />

      <Input
        id={"last-name-form-register"}
        htmlForm={"last-name-form-register"}
        name="lastname"
        value={lastname}
        onChange={(event) => {
          setLastName(event.target.value);
          onInputChange();
        }}
        type="text"
        placeholder=" "
        label={"Apellidos"}
        required={true}
        inputColor="var(--white)"
        borderColor="var(--turquoise)"
        labelColor="var(--white)"
      />
      <Input
        id={"country-form-register"}
        htmlForm={"country-form-register"}
        name="country"
        value={country}
        onChange={(event) => {
          setCountry(event.target.value);
          onInputChange();
        }}
        type="text"
        placeholder=" "
        label={"País"}
        required={true}
        inputColor="var(--white)"
        borderColor="var(--turquoise)"
        labelColor="var(--white)"
      />
      <Input
        id={"city-form-register"}
        htmlForm={"city-form-register"}
        name="city"
        value={city}
        onChange={(event) => {
          setCity(event.target.value);
          onInputChange();
        }}
        type="text"
        placeholder=" "
        label={"Ciudad"}
        required={true}
        inputColor="var(--white)"
        borderColor="var(--turquoise)"
        labelColor="var(--white)"
      />
      <Input
        id={"phone-form-register"}
        htmlForm={"phone-form-register"}
        name="phone"
        value={phone !== null ? phone?.toString() : ""}
        onChange={(event) => setPhone(parseInt(event.target.value, 10))}
        type="number"
        placeholder=" "
        label={"Teléfono (opcional)"}
        required={false}
        inputColor="var(--white)"
        borderColor="var(--turquoise)"
        labelColor="var(--white)"
      />
      <Input
        id={"email-form-register"}
        htmlForm={"email-form-register"}
        name="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          onInputChange();
        }}
        type="email"
        placeholder=" "
        label={"Correo electrónico"}
        required={true}
        inputColor="var(--white)"
        borderColor="var(--turquoise)"
        labelColor="var(--white)"
      />
    </>
  );
};
