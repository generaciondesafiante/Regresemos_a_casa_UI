import { ReactNode } from "react";
import styles from "./Button.module.css";
import Icon from "@/shared/components/Icons";

interface ButtonProps {
  children?: ReactNode;
  icon?: string; // <- nuevo prop
  iconPosition?: "left" | "right"; // <- opcional, default left
  sizeIcon?: number;
  colorIcon?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: any) => void;
  style?: React.CSSProperties;
  variant?: "default" | "success" | "danger" | "outlineWhite" | "white";
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  iconPosition = "left",
  sizeIcon = 24,
  colorIcon,
  className,
  type = "button",
  disabled,
  loading = false,
  onClick,
  variant = "default",
  width,
  style,
}) => {
  return (
    <button
      className={`
        ${styles["button-component"]} 
        ${styles[`variant-${variant}`]} 
        ${loading ? styles.loading : ""} 
        ${className}
      `}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      style={{ ...style, width: width ?? "100%" }}
    >
      {loading ? (
        <span className={styles.loader}></span>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Icon name={icon} size={sizeIcon} color={colorIcon} />
          )}
          <span>{children}</span>
          {icon && iconPosition === "right" && (
            <Icon name={icon} size={sizeIcon} color={colorIcon} />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
