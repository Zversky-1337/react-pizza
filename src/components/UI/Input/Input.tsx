import React, { type InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  value,
  ...rest
}) => {
  return (
    <label className={styles.inputLabel}>
      <span>{label}</span>
      <input
        {...rest}
        value={value ?? ""} // гарантируем контролируемость
        className={`${styles.input} ${error ? styles.errorInput : ""} ${className || ""}`}
      />
      {error && <p className={styles.error}>{error}</p>}
    </label>
  );
};

export default Input;
