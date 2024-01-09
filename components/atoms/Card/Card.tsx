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
        <h2 className={styles["card-title"]}>{title}</h2>
        <Button
          className={styles["card-button"]}
          onClick={() => onNextVideoClick()}
        >
          Ver curso
        </Button>
      </div>
    </>
  );
};
