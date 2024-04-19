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
    <main className="home">
      <section className={styles["home-welcome"]}>
        <h1 className={styles["home-title"]}>GENERACIÓN DESAFIANTE</h1>
        <Button className={styles["home-button_action"]}>VERSO POR VERSO</Button>
        <div className={styles["home-content_itemsDown"]}>
          <p className={styles["home-sutbtitle_down"]}>¡BIENVENIDO A ESTE CAMINAR!</p>
          <div className={styles["home-socialNetworks_down"]}>
            <FacebookIcon />
            <div className={styles['home-icon_middleDown']}>
              <InstagramIcon />
            </div>
            <YoutubeIcon />
          </div>
        </div>
      </section>
      {/* section two */}
      <section className={styles["home-container_challenging"]}>
        <h2 className={styles["home-title_challenging"]}>¿QUÉ ES SER DESAFIANTE?</h2>
        <p className={styles["home-mainParagraph_challenging"]}>
          Somos una
          <span className={styles["home-paragraphBold_challenging"]}>
            plataforma multimedia
          </span>
          para el estudio de la palabra del Señor desde una perspectiva hebrea.
          Ser desafiante es:
        </p>
        <div className={styles["home-container-stepr"]}>
          <div className={styles["home-items_step"]}>
            <span className={styles["home-step_number"]}>01</span>
            <div>
              <p className={styles["home-title_step"]}>MOSTRAR TU IDENTIDAD</p>
              <span className={styles["home-biblica_step"]}>
                Sin importar el que dirán. <br />
                Apocalipsis 14:12
              </span>
            </div>
          </div>
          <div className={styles["home-items_step"]}>
            <span className={styles["home-step_number"]}>02</span>
            <div>
              <p className={styles["home-title_step"]}>
                IR <span className={styles["home-title_reverseWord"]}>CONTRA</span>
                CORRIENTE
              </p>
              <i className={styles["home-biblica_step"]}>Salir del sistema</i>
            </div>
          </div>
          <div className={styles["home-items_step"]}>
            <span className={styles["home-step_number"]}>03</span>
            <div>
              <p className={styles["home-title_step"]}>IR CONTRA CORRIENTE</p>
              <span className={styles["home-biblica_step"]}>
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
      <section className={styles["home-shedulesLast"]}>
        <div className={styles["home-container_shedulesLast"]}>
          <Link href={""} className={styles["home-session_linkSchedules"]}>
            <h2 className={styles["home-title_shedulesLast"]}>HORARIOS</h2>
            <img
              src="/homePage/sukat-david-home.webp"
              alt=" image sukat david horarios"
              className={styles["home-image-sukatDavid"]}
            />
          </Link>
          <Link href={""} className={styles["home-section_linkCourses"]}>
            <h2 className={styles["home-title_shedulesLast"]}>
              ÚLTIMO{" "}
              <span className={styles["home-spanTitle_shedules"]}>ESTUDIO:</span>
            </h2>
            <img
              src="/homePage/LASTCOURSE.webp"
              alt=""
              className={styles["home-image_latestStudy"]}
            />
          </Link>
        </div>
      </section>
    </main>
  );
};
