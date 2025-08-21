import React from "react";
import styles from "./styles.module.css";

type TextVariant = "h1" | "h2" | "h3" | "body" | "caption" | "small";
type TextColor = "primary" | "secondary" | "success" | "error" | "neutral";
type TextAlign = "left" | "center" | "right";

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
  color = "var(--black)",
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
