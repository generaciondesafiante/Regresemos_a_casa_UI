import { dataProverbsImages } from "./dataProverbsImages";
import styles from "./ProverbsImages.module.css";

export const ProverbsImages = () => {
  return (
    <section className={styles["proverbsImages__container"]}>
      <div className={styles["proverbsImages__content"]}>
        {dataProverbsImages.map((image, index) => (
          <img
            src={image.images}
            alt={image.name}
            key={index}
            className={styles["proverbsImages__image"]}
          />
        ))}
      </div>
    </section>
  );
};
