"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getSession, signIn } from "next-auth/react";
import { Input } from "../../atoms";
import Button from "@/shared/components/Button/Button";

import styles from "./Login.module.css";
import { useUserStore } from "@/shared/store/user-store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Text from "@/shared/components/Text";

const schema = z.object({
  email: z.string().min(2, "El correo electronico es obligatorio").min(1),
  password: z.string().min(2, "La contraseña es obligatoria").min(1),
});

type FormData = z.infer<typeof schema>;

export const Login: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const responseNextAuth = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (responseNextAuth?.error) {
      const errorMessage = responseNextAuth.error;
      console.error(responseNextAuth?.error);
      if (errorMessage.includes("Failed to parse URL from undefined/auth")) {
        Swal.fire({
          icon: "error",
          title: "Error en autenticación",
          text: "Hubo un problema con el servidor.Por favor, intenta nuevamente más tarde.",
        });
      } else if (errorMessage.includes("Server error")) {
        Swal.fire({
          icon: "error",
          title: "Error en autenticación",
          text: "Hubo un problema con el servidor. Por favor, intenta nuevamente más tarde.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en autenticación",
          text: "Usuario o contraseña incorrecta",
        });
      }

      setIsLoading(false);
      return;
    }

    const session = await getSession();
    if (session && session.user) {
      setUser(session.user);
    }

    setIsLoading(false);
    router.push("/dashboard");
  };
  return (
    <>
      <form
        action=""
        className={styles["form-login"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text variant="h1" color="white">
          ¡Bienvenido/a al Recorrido de la fé!
        </Text>
        <Input
          id="email"
          htmlForm="email"
          name="emeil"
          type="email"
          placeholder=" "
          label="Correo Electrónico"
          register={register("email")}
          error={errors.email}
          borderColor="var(--turquoise)"
          inputColor="var(--white)"
        />
        <Input
          id="password"
          htmlForm="password"
          name="password"
          type="password"
          placeholder=" "
          label="Contraseña"
          register={register("password")}
          error={errors.password}
          borderColor="var(--turquoise)"
          inputColor="var(--white)"
        />
        <div>
          <Link
            className={styles["form-login_forgotPassword"]}
            href={"/forgetpassword"}
          >
            Olvidé mi contraseña
          </Link>

          <Button
            className={styles["form-login_btn"]}
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </Button>
          <Link href={"/register"} className={styles["link-register"]}>
            <Button className={styles["form-register_btn"]} type="submit">
              Registro
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};
