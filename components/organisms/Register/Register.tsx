"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Input } from "../../atoms";
import styles from "./Register.module.css";

export const Register = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [image, setImage] = useState<string>(
    "'http://somebooks.es/wp-content/uploads/2018/12/Poner-una-imagen-a-la-cuenta-de-usuario-en-Windows-10-000.png'"
  );
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        lastname,
        country,
        city,
        phone,
        image,
      }),
    });

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      name,
      email,
      password,
      lastname,
      country,
      city,
      phone,
      image,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };
  return (
    <>
      <form
        action=""
        className={styles["form-register"]}
        onSubmit={handleSubmit}
      >
        <h2 className={`${styles["form-register-title"]} `}>
          <span>¡Bienvenido/a </span>
          <span>Crea tu cuenta!</span>
        </h2>
        <section className={styles["continer-label_grid"]}>
          <Input
            id={"name-form-register"}
            htmlForm={"name-form-register"}
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            onChange={(event) => setLastName(event.target.value)}
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
            onChange={(event) => setCountry(event.target.value)}
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
            onChange={(event) => setCity(event.target.value)}
            type="text"
            placeholder=" "
            label={"Ciudad"}
            isRequire={true}
          />
          <Input
            id={"phone-form-register"}
            htmlForm={"phone-form-register"}
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            type="text"
            placeholder=" "
            label={"Teléfono (optional)"}
            isRequire={false}
          />

          <Input
            id={"email-form-register"}
            htmlForm={"email-form-register"}
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder=" "
            label={"Correo electrónico"}
            isRequire={true}
          />
          <Input
            id={"password-form-register"}
            htmlForm={"password-form-register"}
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder=" "
            label={"Contraseña"}
            isRequire={true}
          />

          <Input
            id={"password2-form-register"}
            htmlForm={"password2-form-register"}
            name="password2"
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
            type="password"
            placeholder=" "
            label={"Repite la contraseña"}
            isRequire={true}
          />
        </section>

        <Link
          className={styles["form-register-forgot_login"]}
          href="/loginPage"
        >
          ¿Ya tienes cuenta?
        </Link>

        <button className={styles["form-register-btn"]} type="submit">
          Crear cuenta
        </button>
      </form>
    </>
  );
};
