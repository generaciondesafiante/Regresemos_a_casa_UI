import { FC } from "react";
import { Input } from "../../../atoms";

interface RegisterFormInformationProps {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<number | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  lastname: string;
  country: string;
  city: string;
  phone: number | null;
  email: string;
}
export const RegisterFormInformation: FC<RegisterFormInformationProps> = ({
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
  return (
    <>
      <Input
        id={"name-form-register"}
        htmlForm={"name-form-register"}
        name="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        type="text"
        placeholder=" "
        label={"Nombres"}
        isRequire={true}
      />
      <Input
        id={"last-name-form-register"}
        htmlForm={"last-name-form-register"}
        name="lastname"
        value={lastname}
        onChange={(event) => {
          setLastName(event.target.value);
        }}
        type="text"
        placeholder=" "
        label={"Apellidos"}
        isRequire={true}
      />
      <Input
        id={"country-form-register"}
        htmlForm={"country-form-register"}
        name="country"
        value={country}
        onChange={(event) => {
          setCountry(event.target.value);
        }}
        type="text"
        placeholder=" "
        label={"País"}
        isRequire={true}
      />
      <Input
        id={"city-form-register"}
        htmlForm={"city-form-register"}
        name="city"
        value={city}
        onChange={(event) => {
          setCity(event.target.value);
        }}
        type="text"
        placeholder=" "
        label={"Ciudad"}
        isRequire={true}
      />
      <Input
        id={"phone-form-register"}
        htmlForm={"phone-form-register"}
        name="phone"
        value={phone !== null ? phone.toString() : ""}
        onChange={(event) => setPhone(parseInt(event.target.value, 10) || null)}
        type="number"
        placeholder=" "
        label={"Teléfono (optional)"}
        isRequire={false}
      />
      <Input
        id={"email-form-register"}
        htmlForm={"email-form-register"}
        name="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        type="email"
        placeholder=" "
        label={"Correo electrónico"}
        isRequire={true}
      />
    </>
  );
};
