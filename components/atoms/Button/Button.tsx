import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children?: ReactNode; // This allows additional content to be passed as children of the component
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (event: any) => void;
  style?: React.CSSProperties;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  disabled,
  onClick,
}) => {
  return (
    <button
      className={`${styles["button-component"]} ${className} ${type} `}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
