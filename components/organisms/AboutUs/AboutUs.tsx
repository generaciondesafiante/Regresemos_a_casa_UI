"use client";
import Link from "next/link";
import styles from "./AboutUs.module.css";

export const AboutUs = () => {
  const imagenLincolns =
    "https://firebasestorage.googleapis.com/v0/b/quienes-somos-ec597.appspot.com/o/30743886_2126087857670517_61279119260652.webp?alt=media&token=d561dac8-c7d1-4393-9740-ecaa2b4221c2";

  const imagenAbigailMichell =
    "https://firebasestorage.googleapis.com/v0/b/quienes-somos-ec597.appspot.com/o/54517632_2414760852078060_82520352340574.webp?alt=media&token=477072b0-ca33-4d84-af51-4c26c50e419c";

  const imagenDanielaLopez =
    "https://firebasestorage.googleapis.com/v0/b/quienes-somos-ec597.appspot.com/o/Milka%20Daniela.webp?alt=media&token=f9c07afa-32de-4dd4-a251-a8a312bbb88e";

  const discoverBible =
    "https://firebasestorage.googleapis.com/v0/b/quienes-somos-ec597.appspot.com/o/3000PX%20Logos_Mesa%20de%20trabajo%201.webp?alt=media&token=a1e48414-a151-48c9-bd95-a4f70d7cce3c";

  const imagenFooter =
    "https://firebasestorage.googleapis.com/v0/b/quienes-somos-ec597.appspot.com/o/d166cc_89e082e6997946c1924000b082e3d4ad~mv2.webp?alt=media&token=f35c2e10-2262-4e7c-9d5a-feba69a75a3a";

  return (
    <div className={styles["aboutUs__container"]}>
      <video controls className={styles["aboutUs__video"]}>
        <source
          src="https://video.wixstatic.com/video/d166cc_bf68bc0718e546a6b23f233fb55617fe/1080p/mp4/file.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className={styles["aboutUs__ourObjetive--container"]}>
        <h3 className={styles["aboutUs__ourObjetive--title"]}>
          Nuestro{" "}
          <span className={styles["aboutUs__ourObjetive--textObjective"]}>
            objetivo
          </span>
        </h3>
        <p className={styles["aboutUs__ourObjetive--paragraph1"]}>
          El <b>objetivo</b> es mostrarte lo que ha cambiado nuestras vidas:
          estudiar la Biblia palabra por palabra, de tapa a tapa, desde el
          idioma original, recorriendo la historia para entender cómo se ha
          llegado hasta aquí, qué tradiciones adoptamos y de dónde.{" "}
          <b>¿Te preguntaste alguna vez por qué crees en lo que crees?</b> Bueno
          tomate un minuto y piénsalo.
        </p>
      </div>
      <div className={styles["aboutUs__ourObjetiveVerse--container"]}>
        <p className={styles["aboutUs__ourObjetive--quote"]}>“</p>
        <p className={styles["aboutUs__ourObjetive--verse"]}>
          CUANDO USTEDES ME BUSQUEN, USTEDES ME ENCONTRARÁN CON TAL DE QUE ME{" "}
          <b>BUSQUEN DE TODO CORAZÓN.</b>
        </p>
      </div>
      <div className={styles["aboutUs__ourObjetive--paragraph2"]}>
        <p className={styles["aboutUs__ourObjetiveParagraph2--text1"]}>
          Te contaremos qué programas, libros y diccionarios podrías usar para
          empezar a estudiar las únicas palabras que pueden transformar nuestras
          vidas, la voz que nos permitirá encontrar un propósito para despertar
          cada mañana. Pero si no tienes ninguna pregunta y llegaste aquí de
          casualidad ¡no hay problema! También te servirá aprender un poco de
          historia, ciertas palabras en un nuevo idioma y hasta “tips” para
          vivir. Talvez te des cuenta que el libro más antiguo habla de ti o
          talvéz no ¿quién sabe? De todas formas no pierdes nada.
        </p>
        <p className={styles["aboutUs__ourObjetiveParagraph2--text2"]}>
          En fin, lo haremos cortito: somos un grupo de chicos que descubrimos
          la profundidad y verdad del libro más vendido y menos comprendido del
          mundo, sin institutos bíblicos, grandes congregaciones o sistemas
          religiosos. Sin merecerlo nos hallamos dentro del plan de nuestro
          Dios, el Creador de todo lo que existe.{" "}
          <b>
            Solo queremos exponer la voz del verdadero y único Pastor porque
            sabemos que Sus ovejas oirán Su voz.
          </b>
        </p>
      </div>
      <div className={styles["aboutUs__ourObjetive--photos"]}>
        <div>
          <img
            className={styles["aboutUs__ourObjeticePhotos--lincolns"]}
            src={imagenLincolns}
            alt="lincolns' photo"
          />
          <p className={styles["aboutUs__ourObjetice--textPhoto"]}>
            <b>Lincolns</b> y <b>Mariuxi</b>
          </p>
          <p className={styles["aboutUs__ourObjetice--textPhoto"]}>Mendoza</p>
        </div>
        <div>
          <img
            className={styles["aboutUs__ourObjeticePhotos--abigail"]}
            src={imagenAbigailMichell}
            alt="abigail's photo"
          />
          <p className={styles["aboutUs__ourObjetice--textPhoto"]}>
            <b>Abigail</b> Michelle
          </p>
        </div>
        <div>
          <img
            className={styles["aboutUs__ourObjeticePhotos--danielaLopez"]}
            src={imagenDanielaLopez}
            alt="daniela's photo"
          />
          <p className={styles["aboutUs__ourObjetice--textPhoto"]}>
            <b>Daniela</b> López
          </p>
        </div>
      </div>
      <div className={styles["aboutUs__ourObjetiveParagraph3--container"]}>
        <div className={styles["aboutUs__ourObjetiveParagraph3--subcontent"]}>
          <h3 className={styles["aboutUs__ourObjetiveParagraph3--title"]}>
            Minesterios
            <span className={styles["aboutUs__ourObjetive--titleBold"]}>
              {" "}
              asociados
            </span>
          </h3>
          <p className={styles["aboutUs__ourObjetiveParagraph3--paragraph"]}>
            ¡Más de<b> 3000 horas de comentarios</b> y{" "}
            <b>explicaciones de toda la Biblia! </b>
            <span>
              estudios panorámicos y resúmenes de cada libro, estudios verso por
              verso de todos los capítulos de la Biblia en formato de audio mp3,
              con sus respectivas transcripciones en pdf, además de estudios en
              video en el lugar de los hechos.
              <br />
              <br />
              Si tienes un llamado a la enseñanza de la Biblia, o simplemente
              estás hambriento por aprender, en esta página encontrarás recursos
              ilimitados para saciar tu hambre.
            </span>
          </p>
        </div>
        <Link href={"https://www.descubrelabiblia.org/"} target="_blank">
          <img
            className={styles["aboutUs__ourObjetive--imgDescubreLaBiblia"]}
            src={discoverBible}
            alt="Image of bible background"
          />
        </Link>
      </div>
      <img
        className={styles["aboutUs__ourObjetive--imgFooter-mobile"]}
        src="https://firebasestorage.googleapis.com/v0/b/quienes-somos-ec597.appspot.com/o/d166cc_89e082e6997946c1924000b082e3d4ad~mv2%20(1).webp?alt=media&token=a84d80db-96a2-4ea6-be14-608aafbf2ecd"
        alt="Image people worshiping"
      />
      <div className={styles["aboutUs__ourObjetive--imgFooterContainer"]}>
        <img src={imagenFooter} alt="Image people worshiping" />
      </div>
    </div>
  );
};
