"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button } from "../../atoms";
import { ArrowRightIcon } from "../../atoms/icons/arrowsIcons";
import { RegisterFormPassword } from "./RegisterFormPassword/RegisterFormPassword";
import { RegisterFormInformation } from "./RegisterFormInformation/RegisterFormInformation";
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
  const [phone, setPhone] = useState<number | null>(null);
  const [image, setImage] = useState<string>(
    "'http://somebooks.es/wp-content/uploads/2018/12/Poner-una-imagen-a-la-cuenta-de-usuario-en-Windows-10-000.png'"
  );
  const [showPasswordSection, setShowPasswordSection] =
    useState<boolean>(false);
  console.log(showPasswordSection);
  const handleInputChange = () => {
    // Lógica para activar/desactivar la sección de contraseña
    const allFieldsFilled: boolean = !!(
      name &&
      email &&
      lastname &&
      country &&
      city &&
      phone
    );
    setShowPasswordSection(allFieldsFilled);
  };
  const handlePasswordButtonClick = () => {
    if (!showPasswordSection) {
      setShowPasswordSection(true);
    }
  };

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    if (password !== password2) {
      Swal.fire({
        icon: "error",
        title: "Contraseñas no coinciden",
        text: "Las contraseñas ingresadas no coinciden. Por favor, verifica e intenta nuevamente.",
      });
      return;
    }
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
        phone: phone === null ? null : phone,
        image,
      }),
    });

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      Swal.fire({
        icon: "error",
        title: "Revisar los campos obligatorios",
        text: "Probablemente hay un campo obligatorio sin llenar.",
      });
      if (res.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Usuario Existente",
          text: "El usuario con este correo electrónico ya existe. Por favor, utiliza otro correo electrónico.",
        });
      }
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
        <section>
          {showPasswordSection ? (
            <>
              <RegisterFormPassword
                setPassword={setPassword}
                setPassword2={setPassword2}
                password2={password2}
                password={password}
              />
            </>
          ) : (
            <div className={styles["continer-label_grid"]}>
              <RegisterFormInformation
                setLastName={setLastName}
                setName={setName}
                setCountry={setCountry}
                setCity={setCity}
                setPhone={setPhone}
                setEmail={setEmail}
                name={name}
                lastname={lastname}
                country={country}
                city={city}
                phone={phone}
                email={email}
                onInputChange={handleInputChange}
              />
            </div>
          )}

          <div className={styles["center-label-in"]}>
            <Button
              className={
                showPasswordSection ? styles["enabled"] : styles["disabled"]
              }
              type="button"
              onClick={handlePasswordButtonClick}
              disabled={!showPasswordSection}
            >
              <ArrowRightIcon />
            </Button>
          </div>
        </section>

        <Link
          className={styles["form-register_loginRedirection"]}
          href="/loginPage"
        >
          ¿Ya tienes cuenta?
        </Link>
      </form>
    </>
  );
};
