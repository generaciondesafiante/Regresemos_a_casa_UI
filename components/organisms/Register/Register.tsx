"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button } from "../../atoms";
import { ArrowLeftIcon, ArrowRightIcon } from "../../atoms/icons/arrowsIcons";
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
  const [phone, setPhone] = useState<number>();
  const [showPasswordSection, setShowPasswordSection] =
    useState<boolean>(false);
  const [condicionalView, setCondicionalView] = useState<boolean>(false);

  const handleInputChange = () => {
    const allFieldsFilled: boolean = !!(
      name &&
      email.includes("@") &&
      email.includes(".") &&
      lastname &&
      country &&
      city
    );
    setShowPasswordSection(allFieldsFilled);
  };
  const handlePasswordButtonClick = () => {
    if (showPasswordSection) {
      setCondicionalView(true);
    } else {
      setCondicionalView(false);
    }
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCondicionalView(false)
  };

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
      }),
    });

    if (res.status === 500) {
      Swal.fire({
        icon: "error",
        title: "Upss",
        text: `Error en nuestro servidor, comunícate con el administrador del grupo para tu registro.`,
      });
    }
    const responseAPI = await res.json();
    if (!res.ok) {
      setErrors(responseAPI.message);
      Swal.fire({
        icon: "error",
        title: "¡Upss!",
        text: `${responseAPI.msg}`,
      });
      if (res.status === 422) {
        Swal.fire({
          icon: "error",
          title: "Revisar los campos obligatorios",
          text: `${errors} ${responseAPI.errors[0].msg}`,
        });
      }
      if (res.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Upss",
          text: `${responseAPI.msg}`,
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
        className={styles["register-form"]}
        onSubmit={handleSubmit}
      >
        <section className={styles["register-section"]}>
          {condicionalView ? (
            <>
              <div className={styles["register-form-passwordInputs"]}>
                <div className={styles["register-containerBackButtonFormRegister"]}>
                  <button
                    className={styles["register-backButtonFormRegister"]}
                    onClick={handleBackButtonClick}
                  >
                    <ArrowLeftIcon />
                    <p>Regresar</p>
                  </button>
                </div>
                <h2 className={`${styles["register-form-passwordTitle"]} `}>
                  Elige tu contraseña
                </h2>
                <RegisterFormPassword
                  setPassword={setPassword}
                  setPassword2={setPassword2}
                  password2={password2}
                  password={password}
                  labelButton={"Crear cuenta"}
                  inputColor="var(--white)"
                  borderColor="var(--turquoise)"
                  labelColor="var(--white)"
                  buttonColor={"var(--white)"}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className={`${styles["register-form-infoTitle"]} `}>
                <span>¡Bienvenido/a </span>
                <span>Crea tu cuenta!</span>
              </h2>
              <div className={styles["register-form_infoInputs"]}>
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
              <Link
                className={styles["register-form_loginRedirection"]}
                href="/loginPage"
              >
                ¿Ya tienes cuenta?
              </Link>
              <Button
                className={
                  showPasswordSection
                    ? styles["register-form_loginRedirection_buttonEnabled"]
                    : styles["register-form_loginRedirection_buttonDisabled"]
                }
                type="button"
                disabled={!showPasswordSection}
                onClick={handlePasswordButtonClick}
              >
                <ArrowRightIcon />
              </Button>
            </>
          )}
        </section>
      </form>
    </>
  );
};
