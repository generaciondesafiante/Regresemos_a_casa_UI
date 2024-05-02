"use";
import Link from "next/link";
import styles from "./ThematicStudies.module.css";
import { thematicStudiesVideo } from "./dataImageVideo";
import { thematicsStudiesPDF } from "./dataPDF";

export const ThematicStudies = () => {
  return (
    <section className={styles["thematicStudies"]}>
      <div className={styles["thematicStudies__welcome"]}>
        <h2 className={styles["thematicStudies__title--welcome"]}>
          ESTUDIOS TEMÁTICOS
        </h2>
        <p className={styles["thematicStudies__paragraph--welcome"]}>
          ¡No te pierdas de los estudios de <b>temas específicos</b> en pdfs y
          videos!
        </p>
      </div>
      <div className={styles["thematicStudies__content--videosThematics"]}>
        <div className={styles["thematicStudies__content--textInfo"]}>
          <h2 className={styles["thematicStudies__title--textInfo"]}>VIDEOS</h2>
          <p className={styles["thematicStudies__paragraph--textInfo"]}>
            ¡Series inspiradas por el Señor! Camina con nosotros.
          </p>
        </div>
        {thematicStudiesVideo.map((video, index) => (
          <Link href={video.href} key={index} target="_blank">
            <img
              src={video.image}
              alt={video.name}
              className={styles["thematicStudies__image--videosThematics"]}
            />
          </Link>
        ))}
      </div>
      <div className={styles["thematicStudies__content--PDFThematics"]}>
        <div
          className={`${styles["thematicStudies__content--textInfo"]} ${styles["thematicStudies__content--textInfo-PDFs"]} `}
        >
          <h2 className={styles["thematicStudies__title--textInfo"]}>PDFs</h2>
          <p className={`${styles["thematicStudies__paragraph--textInfo"]} ${styles['thematicStudies__paragraph--PDFs']}`}>
            Temas que confrontan nuestros pensamientos. ¿Por qué creemos lo que
            creemos?
          </p>
        </div>
        <div className={styles["thematicStudies__content--PDF"]}>
          {thematicsStudiesPDF.map((pdf, index) => (
            <div key={index}>
              <Link href={pdf.pdfLink} target="_blank">
                <img
                  src={pdf.image}
                  alt={pdf.name}
                  className={styles["thematicStudies__image--PDF"]}
                />
              </Link>
              <p className={styles["thematicStudies__paragraph--PDF"]}>
                {pdf.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
