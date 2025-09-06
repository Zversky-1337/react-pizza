import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import IMask from "imask";
import styles from "./PersonalData.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchProfile,
  saveProfile,
  updateProfile,
} from "../../redux/slices/personalDataSlice.ts";

interface FormData {
  name: string;
  phoneNumber: string;
  birthdayDay: string;
  birthdayMonth: string;
  birthdayYear: string;
  email: string;
}

const PersonalData: React.FC = () => {
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const [btnText, setBtnText] = useState("Сохранить");
  const [isSave, setIsSave] = useState(false);

  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector(
    (state) => state.personalData,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    if (!phoneRef.current) return;
    const mask = IMask(phoneRef.current, { mask: "+{7} (000) 000-00-00" });
    mask.on("accept", () => setValue("phoneNumber", mask.value));
    return () => mask.destroy();
  }, [setValue]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("phoneNumber", profile.phoneNumber);
      setValue("birthdayDay", profile.birthdayDay);
      setValue("birthdayMonth", profile.birthdayMonth);
      setValue("birthdayYear", profile.birthdayYear);
      setValue("email", profile.email);

      setBtnText("Изменить");
      setIsSave(true);
    }
  }, [profile, setValue]);

  const onSubmit = (data: FormData) => {
    if (!profile) {
      dispatch(saveProfile(data));
    } else {
      dispatch(updateProfile({ id: profile.id, ...data }));
    }
    setBtnText("Изменить");
    setIsSave(true);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isSave) {
      e.preventDefault();
      setIsSave(false);
      setBtnText("Сохранить");
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.personalDataContainer}>
      <h1>Личные Данные</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Имя */}
        <label>
          <h3>Имя</h3>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: "Введите ваше имя",
              validate: (value) => {
                const trimmed = value.replace(/\s+/g, "");
                if (!trimmed) return "Имя не может быть пустым";
                if (/\s/.test(value)) return "Имя должно быть одним словом";
                return true;
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                disabled={isSave}
                onChange={(e) =>
                  field.onChange(e.target.value.replace(/\s+/g, ""))
                }
              />
            )}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </label>

        {/* Телефон */}
        <label>
          <h3>Телефон</h3>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{
              required: "Укажите номер телефона",
              validate: (value) => {
                const digits = value.replace(/\D/g, "");
                return digits.length === 11 && digits.startsWith("7")
                  ? true
                  : "Введите корректный номер в формате +7 (XXX) XXX-XX-XX";
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                ref={phoneRef}
                type="tel"
                placeholder="+7 (___) ___-__-__"
                disabled={isSave}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className={styles.error}>{errors.phoneNumber.message}</p>
          )}
        </label>

        {/* Дата рождения */}
        <label>
          <h3>День рождения</h3>
          <div className={styles.birthdayContainer}>
            {/* День */}
            <Controller
              name="birthdayDay"
              control={control}
              defaultValue=""
              rules={{ required: "Выберите день" }}
              render={({ field }) => (
                <select {...field} disabled={isSave}>
                  <option value="">День</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              )}
            />
            {/* Месяц */}
            <Controller
              name="birthdayMonth"
              control={control}
              defaultValue=""
              rules={{ required: "Выберите месяц" }}
              render={({ field }) => (
                <select {...field} disabled={isSave}>
                  <option value="">Месяц</option>
                  {[
                    "Январь",
                    "Февраль",
                    "Март",
                    "Апрель",
                    "Май",
                    "Июнь",
                    "Июль",
                    "Август",
                    "Сентябрь",
                    "Октябрь",
                    "Ноябрь",
                    "Декабрь",
                  ].map((month, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              )}
            />
            {/* Год */}
            <Controller
              name="birthdayYear"
              control={control}
              defaultValue=""
              rules={{ required: "Выберите год" }}
              render={({ field }) => (
                <select {...field} disabled={isSave}>
                  <option value="">Год</option>
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          </div>
          {(errors.birthdayDay ||
            errors.birthdayMonth ||
            errors.birthdayYear) && (
            <p className={styles.error}>
              Пожалуйста, выберите полную дату рождения
            </p>
          )}
        </label>

        {/* Почта */}
        <label>
          <h3>Почта</h3>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Укажите почту",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Введите корректный email",
              },
            }}
            render={({ field }) => (
              <input
                type="email"
                {...field}
                disabled={isSave}
                onChange={(e) =>
                  field.onChange(e.target.value.replace(/\s+/g, ""))
                }
                onKeyDown={(e) => e.key === " " && e.preventDefault()}
              />
            )}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </label>

        {/* Кнопка */}
        <button
          type={isSave ? "button" : "submit"}
          className={isSave ? styles.saved : styles.saveButton}
          onClick={handleEditClick}
        >
          {btnText}
        </button>
      </form>
    </div>
  );
};

export default PersonalData;
