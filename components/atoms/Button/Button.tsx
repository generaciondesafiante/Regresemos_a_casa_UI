import { ReactNode } from "react";
import styles from "./Button.module.css";
import BeatLoader from "react-spinners/BeatLoader";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (event: any) => void;
  style?: React.CSSProperties;
  colorLoading?: string;
  loading?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  disabled = false,
  onClick,
  colorLoading = "var(--greenDesafiante)",
  loading = false,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {loading ? <BeatLoader size={10} color={colorLoading} /> : children}
    </button>
  );
};
