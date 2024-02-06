import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children?: ReactNode; // This allows additional content to be passed as children of the component
  className?: string;
  type?: string;
  disabled?: boolean;
  onClick?: (event: any) => void;
  style?: React.CSSProperties;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={`${styles["button-component"]} ${className} ${type} `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
