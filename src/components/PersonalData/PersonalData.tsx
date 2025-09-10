import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchProfile,
  saveProfile,
  updateProfile,
} from "../../redux/slices/personalDataSlice";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";
import styles from "./PersonalData.module.scss";

interface FormData {
  name: string;
  phoneNumber: string;
  birthdayDay: string;
  birthdayMonth: string;
  birthdayYear: string;
  email: string;
}

const PersonalData: React.FC = () => {
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
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      Object.entries(profile).forEach(([key, value]) =>
        setValue(key as keyof FormData, value),
      );
      setBtnText("Изменить");
      setIsSave(true);
    }
  }, [profile, setValue]);

  const onSubmit = (data: FormData) => {
    if (!profile) dispatch(saveProfile(data));
    else dispatch(updateProfile({ id: profile.id, ...data }));
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
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Введите имя",
            validate: (value) =>
              /^[A-Za-zА-Яа-яЁё]+$/.test(value) ||
              "Имя должно содержать только буквы и быть одним словом",
          }}
          render={({ field, fieldState }) => (
            <Input
              id="name" // связывает label с input
              name={field.name} // передаём name из react-hook-form
              label="Имя"
              disabled={isSave}
              value={field.value ?? ""} // контролируемый input
              onChange={(e) => {
                const filtered = e.target.value.replace(
                  /[^A-Za-zА-Яа-яЁё]/g,
                  "",
                );
                field.onChange(filtered);
              }}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: "Укажите номер телефона",
            validate: (value) =>
              value.length === 11 || "Введите корректный номер",
          }}
          render={({ field }) => (
            <IMaskInput
              id="phoneNumber" // для label и доступности
              name={field.name} // обязательно для RHF
              mask="+{7} (000) 000-00-00"
              placeholder="+7 (___) ___-__-__"
              disabled={isSave}
              value={field.value ? `7${field.value.slice(1)}` : ""}
              onAccept={(value) =>
                field.onChange(value.replace(/\D/g, "").slice(0, 11))
              }
              overwrite
              lazy={false}
            />
          )}
        />
        {errors.phoneNumber && (
          <p className={styles.error}>{errors.phoneNumber.message}</p>
        )}

        <div className={styles.birthdayContainer}>
          <Controller
            name="birthdayDay"
            control={control}
            rules={{ required: "Выберите день" }}
            render={({ field, fieldState }) => (
              <Select
                label="День"
                options={Array.from({ length: 31 }, (_, i) => ({
                  value: i + 1,
                  label: `${i + 1}`,
                }))}
                disabled={isSave}
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="birthdayMonth"
            control={control}
            rules={{ required: "Выберите месяц" }}
            render={({ field, fieldState }) => (
              <Select
                label="Месяц"
                options={[
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
                ].map((m, i) => ({ value: i + 1, label: m }))}
                disabled={isSave}
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="birthdayYear"
            control={control}
            rules={{ required: "Выберите год" }}
            render={({ field, fieldState }) => (
              <Select
                label="Год"
                options={Array.from({ length: 100 }, (_, i) => {
                  const y = new Date().getFullYear() - i;
                  return { value: y, label: `${y}` };
                })}
                disabled={isSave}
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Укажите почту",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Введите корректный email",
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              label="Почта"
              type="email"
              disabled={isSave}
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />

        <Button
          type={isSave ? "button" : "submit"}
          variant={isSave ? "secondary" : "primary"}
          onClick={handleEditClick}
        >
          {btnText}
        </Button>
      </form>
    </div>
  );
};

export default PersonalData;
