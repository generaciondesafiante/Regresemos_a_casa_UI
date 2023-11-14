import { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children?: ReactNode; // This allows additional content to be passed as children of the component
  className?: string;
  type: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  onClick,
}) => {
  return (
    <button
      className={`${styles["button-component"]} ${className} ${type}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
