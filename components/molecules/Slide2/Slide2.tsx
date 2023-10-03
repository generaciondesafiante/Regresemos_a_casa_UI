import styles from "./Slide2.module.css";
export const Slide2 = () => {
  return (
    <section className={styles["carouselTwo-section"]}>
      <div
        className={`${styles["carouselTwo-content_text"]} ${styles["left"]}`}
      >
        <h1 className={styles["carouselTwo-title"]}>ENCUENTRA LA LUZ</h1>
        <p className={styles["carouselTwo-paragraph"]}>
          La palabra de Dios ilumina nuestros pasos{" "}
          <span>¡Encuentra el camino a la luz de la verdad!</span>
        </p>
      </div>
      <div className={styles["carouselTwo-container_img"]}>
        <img
          className={styles["carouselTwo-img"]}
          src="https://i.ibb.co/Kz0Yfzb/Image-8.png"
          alt="Image book carrousel item two"
        />
      </div>
      <div
        className={`${styles["carouselTwo-content_text"]} ${styles["rigth"]}`}
      >
        <h1
          className={`${styles["carouselTwo-title"]} ${styles["carouselTwo-titleTwo"]}`}
        >
          CONÉCTATE CON TU FE
        </h1>
        <p className={styles["carouselTwo-paragraph"]}>
          Si tú no conoces a tu pareja ¿Cómo sabes que la estás amando
          correctamente? ¡lo mismo pasa con nuestro Dios!{" "}
          <span>Amémoslo como Él desea</span>
        </p>
      </div>
    </section>
  );
};
