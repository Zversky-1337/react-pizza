import styles from "./ModalPizza.module.scss";
import { addItem } from "../redux/slices/cartSlice.ts";
import { useNavigate } from "react-router-dom";
import {
  setActiveSize,
  setActiveType,
  toggleTopping,
} from "../redux/slices/modalPizzaSlice.ts";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import React from "react";

const ModalPizza: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    selectedPizza: pizza,
    activeType,
    activeSize,
    selectedToppings,
    price,
    toppings,
    modalError,
  } = useAppSelector((state) => state.modalPizza);

  if (!pizza) return null;

  const typeNames: string[] = ["тонкое", "традиционное"];

  const onClickAdd = () => {
    const item = {
      id: pizza.id,
      title: pizza.title,
      price: price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: pizza.sizes[activeSize],
    };
    dispatch(addItem(item));
    setTimeout(() => navigate("/"), 100);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          className={styles.imgPizza}
          src={pizza.imageUrl}
          alt={pizza.title}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{pizza.title}</div>
        <div className={styles.pizzaBlockSelector}>
          <ul>
            {pizza.types.map((typeId, i) => (
              <li
                key={i}
                onClick={() => dispatch(setActiveType(i))}
                className={activeType === i ? styles.active : ""}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {pizza.sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => dispatch(setActiveSize(i))}
                className={activeSize === i ? styles.active : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>

        <h2 className={styles.subTitle}>Добавить по вкусу</h2>
        {modalError ? (
          <h2 className={styles.errorMessage}>
            Выбор топпингов временно недоступен:(
          </h2>
        ) : (
          <div className={styles.slider}>
            {toppings.map((obj) => (
              <div
                onClick={() => dispatch(toggleTopping(obj))}
                key={obj.id}
                className={`${styles.toppingCard} ${
                  selectedToppings.includes(obj.id) ? styles.selected : ""
                }`}
              >
                <img
                  className={styles.img}
                  src={obj.UrlTopping}
                  alt={obj.name}
                />
                <h3>{obj.name}</h3>
                <p>{obj.price} ₽</p>
              </div>
            ))}
          </div>
        )}

        <button onClick={onClickAdd} className={styles.btnCart}>
          <h3 className={styles.btnText}>В корзину за {price}₽</h3>
        </button>
      </div>
    </div>
  );
};

export default ModalPizza;
