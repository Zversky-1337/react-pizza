import React, { type SelectHTMLAttributes } from "react";
import styles from "./Select.module.scss";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
  id?: string; // необязательный id
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  id,
  name,
  className,
  ...rest
}) => {
  return (
    <label className={styles.selectLabel} htmlFor={id || name}>
      <span>{label}</span>
      <select
        id={id || name}
        name={name}
        {...rest}
        className={`${styles.select} ${error ? styles.errorSelect : ""} ${className ?? ""}`}
      >
        <option value="">Выберите</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Всегда блок для ошибки */}
      <p className={styles.error}>{error || "\u00A0"}</p>
      {/* "\u00A0" = пробел, чтобы блок не исчезал */}
    </label>
  );
};

export default Select;
