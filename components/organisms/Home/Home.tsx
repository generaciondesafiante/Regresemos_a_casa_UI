"use client";
import Link from "next/link";
import  Button  from "@/shared/components/Button/Button";
import { FacebookIcon } from "../../atoms/icons/home/SocialNetworkIcon/FacebookSocialNetworksIcon";
import { InstagramIcon } from "../../atoms/icons/home/SocialNetworkIcon/InstagramIcon";
import { YoutubeIcon } from "../../atoms/icons/home/SocialNetworkIcon/YoutubeIcon";
import styles from "./Home.module.css";
import Image from "next/image";

export const Home = () => {
  const bePart = [
    {
      name: "proverbios",
      href: "/estudios/proverbios-imagenes",
      image: "/homePage/se_parte_proverbios.webp",
    },
    {
      name: "mejeres-de-oracion",
      href: "/grupos-desafiantes/mujeres-de-oracion",
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
      href: "#",
      image: "/homePage/se_parte_kids.webp",
    },
  ];

  const handleWhatsAppRedirect = () => {
    const numeroWhatsApp = "+54 9 11 5806-4084";
    const mensajeWhatsApp = `Hola, Andrea.\n\nHe visitado la página de Generación Desafiante y me encantaría que mi hijo/a formara parte del grupo de Desafiantes Kids.`;

    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;
    window.open(enlaceWhatsApp, "_blank");
  };
  return (
    <div>
      <section className={styles["home-welcome"]}>
        <div className={styles["overlay"]}></div>
        <Image
          className={styles["image__home"]}
          src="/homePage/homepage.webp"
          alt="Fondo de la página"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
        />
        <h1 className={styles["home-title"]}>GENERACIÓN DESAFIANTE</h1>
        <Button className={styles["home-button_action"]}>
          <Link
            href={"/estudios/verso-por-verso"}
            className={styles["home-link-button_action"]}
          >
            VERSO POR VERSO
          </Link>
        </Button>
        <div className={styles["home-content_itemsDown"]}>
          <p className={styles["home-sutbtitle_down"]}>
            ¡BIENVENIDO A ESTE CAMINAR!
          </p>
          <div className={styles["home-socialNetworks_down"]}>
            <Link
              href={"https://www.facebook.com/generaciondesafiante"}
              target="_blank"
            >
              <FacebookIcon />
            </Link>
            <Link
              href={
                "https://www.instagram.com/generaciondesafiante_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              }
              target="_blank"
            >
              <div className={styles["home-icon_middleDown"]}>
                <InstagramIcon />
              </div>
            </Link>
            <Link
              href={"https://www.youtube.com/c/Generaci%C3%B3ndesafiante"}
              target="_blank"
            >
              <YoutubeIcon />
            </Link>
          </div>
        </div>
      </section>
      {/* section two */}
      <section className={styles["home-container_challenging"]}>
        <h2 className={styles["home-title_challenging"]}>
          ¿QUÉ ES SER DESAFIANTE?
        </h2>
        <p className={styles["home-mainParagraph_challenging"]}>
          Somos una
          <span className={styles["home-paragraphBold_challenging"]}>
            {" "}
            plataforma multimedia{" "}
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
                Sin importar el que dirán.
                <p className={styles["home-biblicaNumber_step"]}>
                  Apocalipsis 14:12
                </p>
              </span>
            </div>
          </div>
          <div className={styles["home-items_step"]}>
            <span className={styles["home-step_number"]}>02</span>
            <div>
              <p className={styles["home-title_step"]}>
                IR
                <span className={styles["home-title_reverseWord"]}>CONTRA</span>
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
                Cada palabra del Maestro
                <p className={styles["home-biblicaNumber_step"]}>Romanos 2</p>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["home-container_bePart"]}>
        <h2 className={styles["home-title_bePart"]}>¡SÉ PARTE!</h2>
        <div className={styles["home-content_itemsBePart"]}>
          {bePart.map((image, index) => (
            <Link href={image.href} key={index}>
              <img
                src={image.image}
                alt={image.name}
                className={styles["home-image_bePart"]}
                onClick={
                  image.name === "desafiante-kids"
                    ? handleWhatsAppRedirect
                    : undefined
                }
              />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles["home-container_shedulesLast"]}>
        <div className={styles["overlay__shedulesLast"]}></div>
        <Image
          src="/homePage/background-times.webp"
          alt="Fondo de la página"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
        />
        <Link
          href={"/sukatDavid"}
          className={styles["home-session_linkSchedules"]}
        >
          <h2 className={styles["home-title_shedulesLast"]}>HORARIOS</h2>
          <Image
            src="/homePage/horario.jpg"
            alt="image sukat david horarios"
            layout="fill"
            objectFit="cover"
            quality={80}
            className={styles["home-image-sukatDavid"]}
          />
        </Link>
        <Link
          href={
            "https://youtube.com/playlist?list=PLX-KKyt726LPrURnoMRWSYvldlQ3b8Kf7&si=dmM6NAbkZTmIgxEm"
          }
          target="_blank"
          className={styles["home-session_linkSchedules"]}
        >
          <h2 className={styles["home-title_shedulesLast"]}>
            ÚLTIMO
            <span className={styles["home-spanTitle_shedules"]}>ESTUDIO:</span>
          </h2>
          <Image
            src="/homePage/LASTCOURSE.webp"
            alt="Último estudio"
            layout="fill"
            objectFit="cover"
            className={styles["home-image_latestStudy"]}
          />{" "}
        </Link>
      </section>
    </div>
  );
};
