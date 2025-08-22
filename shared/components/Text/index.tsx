import React from "react";
import styles from "./styles.module.css";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "small";
type TextColor =
  | "black"
  | "blueLigth"
  | "yellow"
  | "greenDesafiante"
  | "red"
  | "white"
  | "darkGray"
  | "darkBlue";
type TextAlign = "left" | "center" | "right";
type TextWeight = "normal" | "semiBold" | "bold";

interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  align?: TextAlign;
  bold?: boolean;
  children: React.ReactNode | string;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  variant = "body",
  color = "black",
  align = "left",
  bold = false,
  children,
  className = "",
}) => {
  return (
    <p
      className={`${styles.text} ${styles[variant]} ${styles[color]} ${
        styles[align]
      } ${bold ? styles.bold : ""} ${className}`}
    >
      {children}
    </p>
  );
};

export default Text;
