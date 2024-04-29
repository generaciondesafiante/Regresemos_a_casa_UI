import Link from "next/link";
import styles from "./ThematicStudies.module.css";

export const ThematicStudies = () => {
  const thematicStudiesVideo = [
    {
      name: "A la imagen de Dios",
      image: "/courses/thematicStudies/aLaImagenDeDios.webp",
      href: "https://www.youtube.com/watch?v=QnEpWzFTBak&t=9461s",
    },
    {
      name: "Fiestas del SEÑOR",
      image: "/courses/thematicStudies/fiestasDelSeñor.webp",
      href: "https://www.youtube.com/playlist?list=PLX-KKyt726LPBd14fmlIOaH0qNxabCD8V",
    },
    {
      name: "Vigentes / Aplicables",
      image: "/courses/thematicStudies/vigentesAplicables.webp",
      href: "https://www.youtube.com/playlist?list=PLX-KKyt726LMNkFyHm8jy1ErpeFFiC1yv",
    },
    {
      name: "Pureza Desafiante",
      image: "/courses/thematicStudies/purezaDesafiante.webp",
      href: "https://www.youtube.com/playlist?list=PLX-KKyt726LNYq4nQJsXvLyIPLgVhr1bA",
    },
    {
      name: "Cuidando mi templo",
      image: "/courses/thematicStudies/cuidandoMiTemplo.webp",
      href: "https://www.youtube.com/playlist?list=PLX-KKyt726LONP08Ey9llWGuq2Bvnwd41",
    },
    {
      name: "Cosas que creias que estaban en la BIBLIA pero NO",
      image: "/courses/thematicStudies/cosasQueCreias.webp",
      href: "https://www.youtube.com/playlist?list=PLX-KKyt726LM_uBFW0pPTGTlVJX_vyklS",
    },
    {
      name: "¡Atraídos! Serie basada en Oseas",
      image: "/courses/thematicStudies/atraidos.webp",
      href: "https://www.youtube.com/playlist?list=PLX-KKyt726LPEBVz6GR0Z5f6_IV2fhwmd",
    },
  ];

  return (
    <section className={styles["thematicStudies"]}>
      <div className={styles["thematicStudies-welcome"]}>
        <h2 className={styles["thematicStudies-title_welcome"]}>
          ESTUDIOS TEMÁTICOS
        </h2>
        <p className={styles["thematicStudies-paragraph_welcome"]}>
          ¡No te pierdas de los estudios de <b>temas específicos</b> en pdfs y
          videos!
        </p>
      </div>
      <div className={styles["thematicStudies-content_videosThematics"]}>
        <div className={styles['thematicStudies-content_textInfo']}>
          <h2 className={styles['thematicStudies-title_textInfo']}>VIDEOS</h2>
          <p className={styles['thematicStudies-paragraph_textInfo']}>¡Series inspiradas por el Señor! Camina con nosotros.</p>
        </div>
        {thematicStudiesVideo.map((video, index) => (
          <Link href={video.href} key={index} target="_blank">
            <img
              src={video.image}
              alt={video.name}
              className={styles["thematicStudies-image_videosThematics"]}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
