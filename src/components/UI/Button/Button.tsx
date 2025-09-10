import React, { type ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant = "primary", type = "button", ...rest } = props;

  // Создаем объект без variant, чтобы TS точно не ругался
  const buttonProps = rest as Omit<typeof rest, "variant">;

  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
