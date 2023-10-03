import Link from "next/link";
import { Button, Input } from "../../atoms";
import styles from "./Login.module.css";

export const Login: React.FC = () => {
  return (
    <>
      <form className={styles["form-login"]}>
        <h2 className={styles["form-login-title"]}>
          ¡Bienvenido/a al Recorrido de la fé!
        </h2>
        <Input
          id="emailLogin"
          htmlForm="emailLogin"
          name="loginEmail"
          type="email"
          placeholder=" "
          label="Correo Electrónico"
          isRequire={true}
        />
        <Input
          id="passwordLogin"
          htmlForm="passwordLogin"
          name="loginPassword"
          type="password"
          placeholder=" "
          label="Contraseña"
          isRequire={true}
        />
        <Link className={styles["form-login-forgot_login"]} href={"/"}>
          Olvidé mi contraseña
        </Link>

        <Button className={styles["form-login-btn"]}>Ingresar</Button>
      </form>
    </>
  );
};
