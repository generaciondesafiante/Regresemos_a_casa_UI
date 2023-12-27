import { FC } from "react";
import { Button } from "../Button/Button";
import styles from "./Card.module.css";

interface CardProps {
  title?: string;
  onNextVideoClick: () => void;
}

export const Card: FC<CardProps> = ({ title, onNextVideoClick }) => {
  return (
    <>
      <div className={styles["card-container"]}>
        <div className={styles["card-content"]}>
          <h5 className={styles["card-title"]}>{title}</h5>
        </div>
        <div className={styles["card-button_vontainer"]}>
          <Button
            className={styles["card-button"]}
            onClick={() => onNextVideoClick()}
          >
            Ver curso
          </Button>
        </div>
      </div>
    </>
  );
};
