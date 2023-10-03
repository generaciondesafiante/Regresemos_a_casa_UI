import styles from "./Slide1.module.css";

export const Slide1 = () => {
  return (
    <section className={styles["carouselOne-section"]}>
      <img
        className={styles["carouselOne-img_one"]}
        src="https://i.ibb.co/pZL0RjN/Image-4.png"
        alt=""
      />
      <img
        className={styles["carouselOne-img_two"]}
        src="https://i.imgur.com/tqqRire.png"
        alt=""
      />
      <div className={styles["carouselOne-content_text"]}>
        <h1 className={styles["carouselOne-title"]}>
          Regresemos a<span> nuestra </span>
          casa
        </h1>
        <p className={styles["carouselOne-paragraph"]}>
          Un curso que cambiará tu vida y tu relación con el Creador
        </p>
      </div>
    </section>
  );
};
