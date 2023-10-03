import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children?: ReactNode; // This allows additional content to be passed as children of the component
  className?: string;
}
export const Button: React.FC<ButtonProps> = ({ children, className }) => {
  return (
    <button className={`${styles["button-component"]} ${className}`}>
      {children}
    </button>
  );
};
