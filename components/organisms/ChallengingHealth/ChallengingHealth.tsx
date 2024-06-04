import styles from "./ChallengingHealth.module.css";
import { Button } from "../../atoms/Button/Button";
import Link from "next/link";
import {
  dataMenuOne,
  dataMenuTwo,
  dataRecipes,
  dataStudies,
  dataTips,
} from "./data";
import { dataStudiesTwo } from "./data/studies";

export const ChallengingHealth = () => {
  return (
    <main className={styles["challengingHealth"]}>
      <section className={styles["challengingHealth__banner"]}>
        <h1 className={`${styles["challengingHealth__title--banner"]} `}>
          SALUD DESAFIANTE
        </h1>
        <p className={`${styles["challengingHealth__paragraph--banner"]} `}>
          <b>Consejos de vida saludable</b> para cuidar nuestro templo como un
          acto de amor hacia el Señor. #GeneraciónDesafiante
        </p>
      </section>

      <div className={styles["challengingHealth__container--socialNetwork"]}>
        <Button
          className={`${styles["challengingHealth__button--socialNetwork"]}`}
        >
          <Link
            href={"https://chat.whatsapp.com/H1uHYFJBWQ2DvhzgTO9NDq"}
            className={`${styles["challengingHealth__link-button--socialNetwork"]}`}
            target="_blank"
          >
            WhatsApp
          </Link>
        </Button>
        <div className={styles["challengingHealth__line--socialNetwork"]}></div>
      </div>

      <section
        className={`${styles["challengingHealth__container--studies"]} ${styles["challengingHealth__section--general"]}`}
      >
        <div className={styles["challengingHealth__container-text--studies"]}>
          <h2
            className={`${styles["challengingHealth__title--studies"]} ${styles["challengingHealth__title-general"]}`}
          >
            Estudios
          </h2>
          <p
            className={`${styles["challengingHealth__paragraph--studies"]} ${styles["challengingHealth__paragraph-general"]}`}
          >
            <b>En estos estudios</b> podrás encontrar toda la información médica
            y bíblica sobre la alimentación y ejercicio
          </p>
        </div>
        <div
          className={styles["challengingHealth__container-section--studies"]}
        >
          <div
            className={styles["challengingHealth__container-image--studies"]}
          >
            {dataStudies.map((studies, index) => (
              <div
                key={index}
                className={styles["challengingHealth__content-image--studies"]}
              >
                <Link
                  href={studies.link}
                  target="_blank"
                  className={styles["challengingHealth__link-image--studies"]}
                >
                  <img
                    src={studies.image}
                    alt={studies.title}
                    className={styles["challengingHealth__image--studies"]}
                  />
                </Link>
                <p
                  className={styles["challengingHealth__title-image--studies"]}
                >
                  {studies.title}
                </p>
                {studies.tema && (
                  <p
                    className={
                      styles["challengingHealth__topic-image--studies"]
                    }
                  >
                    Tema: {studies.tema}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div
            className={
              styles["challengingHealth__containerTwo-image--studiesTwo"]
            }
          >
            {dataStudiesTwo.map((studies, index) => (
              <div
                key={index}
                className={
                  styles["challengingHealth__content-image--studiesTwo"]
                }
              >
                <Link
                  href={studies.link}
                  target="_blank"
                  className={
                    styles["challengingHealth__link-image--studiesTwo"]
                  }
                >
                  <img
                    src={studies.image}
                    alt={studies.title}
                    className={styles["challengingHealth__image--studiesTwo"]}
                  />
                </Link>
                <p
                  className={
                    styles["challengingHealth__title-image--studiesTwo"]
                  }
                >
                  {studies.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${styles["challengingHealth__container--tips"]} ${styles["challengingHealth__section--general"]}`}
      >
        <div className={styles["challengingHealth__content-title--tips"]}>
          <h2 className={`${styles["challengingHealth__title--tips"]} `}>
            TIP&apos;s
          </h2>
          <p
            className={`${styles["challengingHealth__paragraph--tips"]} ${styles["challengingHealth__title-general"]}`}
          >
            <b>¡Te presentamos</b> tips prácticos!
          </p>
        </div>
        <div className={styles["challengingHealth__content--tips"]}>
          {dataTips.map((tips, index) => (
            <div key={index}>
              <Link
                href={tips.link}
                target="_blank"
                className={styles["challengingHealth__image--tips"]}
              >
                <img
                  src={tips.image}
                  alt={tips.title}
                  className={styles["challengingHealth__image--tips"]}
                />
              </Link>
              <p className={styles["challengingHealth__title-image--tips"]}>
                {tips.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`${styles["challengingHealth__content-background--recipes"]} `}
      >
        <div
          className={`${styles["challengingHealth__container--recipes"]} ${styles["challengingHealth__section--general"]}`}
        >
          <div className={styles["challengingHealth__content-title---recipes"]}>
            <h2
              className={`${styles["challengingHealth__title--recipes"]} ${styles["challengingHealth__title-general"]}`}
            >
              Recetas
            </h2>
            <p
              className={`${styles["challengingHealth__paragraph--recipes"]} ${styles["challengingHealth__title-general"]}`}
            >
              Compartimos contigo recetas. ¡Que importante es la variedad en la
              comida!
            </p>
          </div>
          <div className={styles["challengingHealth__content--recipes"]}>
            {dataRecipes.map((recipes, index) => (
              <div key={index}>
                <Link href={recipes.link} target="_blank">
                  <img
                    src={recipes.image}
                    alt={recipes.title}
                    className={styles["challengingHealth__image--recipes"]}
                  />
                </Link>

                <p
                  className={styles["challengingHealth__title-image--recipes"]}
                >
                  {recipes.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["challengingHealth__content-general--menu"]}>
        <div className={`${styles["challengingHealth__container--menu"]}`}>
          <div className={styles["challengingHealth__content-title--menu"]}>
            <h2 className={`${styles["challengingHealth__title--menu"]}`}>
              Menús
            </h2>
            <h4 className={`${styles["challengingHealth__subTitle--menu"]}`}>
              Aprende a combinar tus comidas con un menú semanal
            </h4>
          </div>

          <div className={styles["challengingHealth__container--items-menu"]}>
            <div className={styles["challengingHealth__container--menuOne"]}>
              <p className={styles["challengingHealth__title--menuOne"]}>
                <i>
                  <b> Semanal:</b> Menú Sugerencia Dra. Mariuxi López
                </i>
              </p>
              <div className={styles["challengingHealth__content--menuOne"]}>
                {dataMenuOne.map((menuOne, index) => (
                  <div
                    key={index}
                    className={
                      styles["challengingHealth__content-image--menuOne"]
                    }
                  >
                    <Link
                      href={menuOne.link}
                      target="_blank"
                      className={
                        styles["challengingHealth__link-image--menuOne"]
                      }
                    >
                      <img
                        src={menuOne.image}
                        alt={menuOne.link}
                        className={styles["challengingHealth__image--menuOne"]}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles["challengingHealth__container--menuTwo"]}>
              <p className={styles["challengingHealth__title--menuOne"]}>
                <i>
                  <b>Menú Semanal:</b> Sugerencia Nutricionista Yanina
                </i>
              </p>
              <div className={styles["challengingHealth__content--menuOne"]}>
                {dataMenuTwo.map((menuTwo, index) => (
                  <div
                    key={index}
                    className={
                      styles["challengingHealth__content-image--menuOne"]
                    }
                  >
                    <Link
                      href={menuTwo.link}
                      target="_blank"
                      className={
                        styles["challengingHealth__link-image--menuOne"]
                      }
                    >
                      <img
                        src={menuTwo.image}
                        alt={menuTwo.link}
                        className={styles["challengingHealth__image--menuOne"]}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
