"use client";
import Link from "next/link";
import { Button } from "../../atoms/Button/Button";
import { FacebookIcon } from "../../atoms/icons/home/SocialNetworkIcon/FacebookSocialNetworksIcon";
import { InstagramIcon } from "../../atoms/icons/home/SocialNetworkIcon/InstagramIcon";
import { YoutubeIcon } from "../../atoms/icons/home/SocialNetworkIcon/YoutubeIcon";
import styles from "./Home.module.css";

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
    <main className="home-container">
      <section className={styles["welcome-home"]}>
        <h1 className={styles["home-title"]}>GENERACIÓN DESAFIANTE</h1>
        <Button className={styles["action-button"]}>VERSO POR VERSO</Button>
        <div className={styles["content-items_down"]}>
          <p className={styles["text-down"]}>¡BIENVENIDO A ESTE CAMINAR!</p>
          <div className={styles["soclialNetworks"]}>
            <FacebookIcon />
            <div className={styles['middle-icon']}>
              <InstagramIcon />
            </div>
            <YoutubeIcon />
          </div>
        </div>
      </section>
      {/* section two */}
      <section className={styles["container-sectionTwo"]}>
        <h2 className={styles["title-sectionTwo"]}>¿QUÉ ES SER DESAFIANTE?</h2>
        <p className={styles["main-paragraph_sectionTwo"]}>
          Somos una
          <span className={styles["bold-paragraph"]}>
            plataforma multimedia
          </span>
          para el estudio de la palabra del Señor desde una perspectiva hebrea.
          Ser desafiante es:
        </p>
        <div className={styles["step-container"]}>
          <div className={styles["step-items"]}>
            <span className={styles["step-number"]}>01</span>
            <div>
              <p className={styles["step-title"]}>MOSTRAR TU IDENTIDAD</p>
              <span className={styles["biblical-step"]}>
                Sin importar el que dirán. <br />
                Apocalipsis 14:12
              </span>
            </div>
          </div>
          <div className={styles["step-items"]}>
            <span className={styles["step-number"]}>02</span>
            <div>
              <p className={styles["step-title"]}>
                IR <span className={styles["reverse-word"]}>CONTRA</span>
                CORRIENTE
              </p>
              <i className={styles["biblical-step"]}>Salir del sistema</i>
            </div>
          </div>
          <div className={styles["step-items"]}>
            <span className={styles["step-number"]}>03</span>
            <div>
              <p className={styles["step-title"]}>IR CONTRA CORRIENTE</p>
              <span className={styles["biblical-step"]}>
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
        <div className={styles["items-content_bePart"]}>
          {bePart.map((image) => (
            <Link href={image.href} key={image.href}>
              <img
                src={image.image}
                alt={image.name}
                className={styles["image-bePart"]}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className={styles["schedules-last_topics"]}>
        <div className={styles["schedule-container_latestTopics"]}>
          <Link href={""} className={styles["link-session-schedules"]}>
            <h2 className={styles["title-schedules_lastTopic"]}>HORARIOS</h2>
            <img
              src="/homePage/sukat-david-home.webp"
              alt=" image sukat david horarios"
              className={styles["image-sukatDavid_schedules"]}
            />
          </Link>
          <Link href={""} className={styles["link-course_section"]}>
            <h2 className={styles["title-schedules_lastTopic"]}>
              ÚLTIMO{" "}
              <span className={styles["span-title_shedules"]}>ESTUDIO:</span>
            </h2>
            <img
              src="/homePage/LASTCOURSE.webp"
              alt=""
              className={styles["latest-study"]}
            />
          </Link>
        </div>
      </section>
    </main>
  );
};
