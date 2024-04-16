"use client";
import Link from "next/link";
import { Button } from "../../atoms/Button/Button";
import { FacebookIcon } from "../../atoms/icons/home/SocialNetworkIcon/FacebookSocialNetworksIcon";
import { InstagramIcon } from "../../atoms/icons/home/SocialNetworkIcon/InstagramIcon";
import { YoutubeIcon } from "../../atoms/icons/home/SocialNetworkIcon/YoutubeIcon";
import styles from "./Home.module.css";
import { Footer } from "../../molecules/Footer/Footer";

export const Home = () => {
  const bePart = [
    {
      name: "proverbios",
      href: "/grupos-desafiantes/proverbios-imagenes",
      image: "/homePage/se_parte_proverbios.webp",
    },
    {
      name: "mejeres-de-oracion",
      href: "/grupos-desafiantes/mujeres-en-oracion",
      image: "/homePage/se_parte_mujeres_de_oracion.webp",
    },
    {
      name: "ser-sanson-no-basta",
      href: "/grupos-desafiantes/ser-Sanson-no-basta",
      image: "/homePage/se_parte_ser_sanson_no_basta.webp",
    },
    {
      name: "cuidando-mi-templo",
      href: "/grupos-desafiantes/salud-desafiante",
      image: "/homePage/se_parte_cuidando_mi_templo.webp",
    },
    {
      name: "desafiante-records",
      href: "/grupos-desafiantes/desafiante-records",
      image: "/homePage/se_parte_records.webp",
    },
    {
      name: "desafiante-kids",
      href: "/grupos-desafiantes/desafiante-kids",
      image: "/homePage/se_parte_kids.webp",
    },
  ];

  return (
    <main className="container-home">
      <section className={styles["welcome-home"]}>
        <h1 className={styles["title-home"]}>GENERACIÓN DESAFIANTE</h1>
        <Button className={styles["button-action"]}>VERSO POR VERSO</Button>
        <div className={styles["content-items-down"]}>
          <p className={styles["text-down"]}>¡BIENVENIDO A ESTE CAMINAR!</p>
          <div className={styles["soclialNetworks"]}>
            <FacebookIcon />
            <InstagramIcon />
            <YoutubeIcon />
          </div>
        </div>
      </section>
      {/* section two */}
      <section className={styles["container-section-two"]}>
        <h2 className={styles["title-section-two"]}>¿QUÉ ES SER DESAFIANTE?</h2>
        <p className={styles["paragraph-main-section-two"]}>
          Somos una{" "}
          <span className={styles["bold-paragraph"]}>
            plataforma multimedia
          </span>{" "}
          para el estudio de la palabra del Señor desde una perspectiva hebrea.
          Ser desafiante es:
        </p>
        <div className={styles["container-step"]}>
          <div className={styles["items-step"]}>
            <span className={styles["step-number"]}>01</span>
            <div>
              <p className={styles["step-title"]}>MOSTRAR TU IDENTIDAD</p>
              <span className={styles["step-bliblico"]}>
                Sin importar el que dirán. <br />
                Apocalipsis 14:12
              </span>
            </div>
          </div>
          <div className={styles["items-step"]}>
            <span className={styles["step-number"]}>02</span>
            <div>
              <p className={styles["step-title"]}>
                IR <span className={styles["reverse-word"]}>CONTRA</span>{" "}
                CORRIENTE
              </p>
              <i className={styles["step-bliblico"]}>Salir del sistema</i>
            </div>
          </div>
          <div className={styles["items-step"]}>
            <span className={styles["step-number"]}>03</span>
            <div>
              <p className={styles["step-title"]}>IR CONTRA CORRIENTE</p>
              <span className={styles["step-bliblico"]}>
                cada palabra del Maestro
                <br />
                Romanos 2
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["bePart-container"]}>
        <h2 className={styles["title-bePart"]}>¡SÉ PARTE!</h2>
        <div className={styles["content-items-bePart"]}>
          {bePart.map((image, key) => (
            <Link href={image.href} key={image.href}>
              <img
                src={image.image}
                alt={image.name}
                className={styles["bePart-image"]}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className={styles["schedules-last-topics"]}>
        <div className={styles["container-schedules-last-topics"]}>
          <Link href={""} className={styles["link-session-schedules"]}>
            <h2 className={styles["title-section-schedules-last-topic"]}>
              HORARIOS
            </h2>
            <img
              src="/homePage/sukat-david-home.webp"
              alt=" image sukat david horarios"
              className={styles["image-sukat-david-schedules"]}
            />
          </Link>
          <Link href={""} className={styles["link-session-course"]}>
            <h2 className={styles["title-section-schedules-last-topic"]}>
              ÚLTIMO{" "}
              <span className={styles["title-shedules-span"]}>ESTUDIO:</span>
            </h2>
            <img
              src="/homePage/LASTCOURSE.webp"
              alt=""
              className={styles["last-study"]}
            />
          </Link>
        </div>
      </section>
    </main>
  );
};
