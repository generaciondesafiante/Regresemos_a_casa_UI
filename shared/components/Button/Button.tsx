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
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  iconPosition = "left",
  sizeIcon,
  colorIcon,
  className,
  type = "button",
  disabled,
  loading = false,
  onClick,
}) => {
  return (
    <button
      className={`${styles["button-component"]} ${className} ${type} ${loading ? styles.loading : ''}`}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <span className={styles.loader}></span>
      ) : (
        <>
          {icon && iconPosition === "left" && <Icon name={icon} size={sizeIcon} color={colorIcon} />}
          <span>{children}</span>
          {icon && iconPosition === "right" && <Icon name={icon} size={sizeIcon} color={colorIcon} />}
        </>
      )}
    </button>
  );
};

export default Button;