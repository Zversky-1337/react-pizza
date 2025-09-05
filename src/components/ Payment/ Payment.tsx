import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  addCard,
  deleteCard,
  fetchCards,
  toggleInput,
} from "../../redux/slices/paymentSlice";
import styles from "./Payment.module.scss";

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const maskCardNumber = (card: string) => {
  const clean = card.replace(/\s/g, "");
  if (clean.length !== 16) return card;
  return `${clean.slice(0, 4)} **** **** ${clean.slice(-4)}`;
};

type FormData = { card: string };

const Payment: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cards, toggleInput: showInput } = useAppSelector(
    (state) => state.payment,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ defaultValues: { card: "" } });

  // загрузка при монтировании
  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const onSubmit = (data: FormData) => {
    dispatch(addCard(data.card));
    reset();
    dispatch(toggleInput(false));
  };

  return (
    <div className={styles.paymentContainer}>
      <h2>Привязанные карты</h2>

      {/* список карт */}
      <div className={styles.cardList}>
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id} className={styles.cardItem}>
              <span className={styles.cardIcon}>💳</span>
              <span className={styles.cardNumber}>
                {maskCardNumber(card.card)}
              </span>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => dispatch(deleteCard(card.id))}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className={styles.noCards}>Нет привязанных карт</p>
        )}
      </div>

      {/* форма */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {showInput && (
          <Controller
            name="card"
            control={control}
            rules={{
              required: "Введите номер карты",
              validate: (value) =>
                value.replace(/\s/g, "").length === 16 ||
                "Номер карты должен содержать 16 цифр",
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                maxLength={19}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  field.onChange(formatted);
                }}
              />
            )}
          />
        )}
        {errors.card && <p className={styles.error}>{errors.card.message}</p>}

        {!showInput ? (
          <button
            type="button"
            className={styles.addButton}
            onClick={() => dispatch(toggleInput(true))}
          >
            Добавить
          </button>
        ) : (
          <button type="submit" className={styles.saveButton}>
            Сохранить
          </button>
        )}
      </form>
    </div>
  );
};

export default Payment;
