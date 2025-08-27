import { useState } from "react";
import styles from "./ModalPizza.module.scss";

const ModalPizza = ({ pizza, toppings }) => {
  const typeNames = ["тонкое", "традиционное"];

  const [price, setPrice] = useState(pizza.price);
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [selectedToppings, setSelectedToppings] = useState([]);

  const toggleTopping = (obj) => {
    if (selectedToppings.includes(obj.id)) {
      setSelectedToppings((prev) => prev.filter((id) => id !== obj.id));
      setPrice((prev) => prev - obj.price);
    } else {
      setSelectedToppings((prev) => [...prev, obj.id]);
      setPrice((prev) => prev + obj.price);
    }
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
                onClick={() => setActiveType(i)}
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
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? styles.active : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <h2 className={styles.subTitle}>Добавить по вкусу</h2>
        <div className={styles.slider}>
          {toppings.map((obj, i) => (
            <div
              onClick={() => toggleTopping(obj)}
              key={obj.id}
              className={`${styles.toppingCard} ${selectedToppings.includes(obj.id) ? styles.selected : ""}`}
            >
              <img className={styles.img} src={obj.UrlTopping} alt={obj.id} />
              <h3>{obj.name}</h3>
              <p>{obj.price} ₽</p>
            </div>
          ))}
        </div>
        <button className={styles.btnCart}>
          <h3 className={styles.btnText}>В корзину за {price}₽</h3>
        </button>
      </div>
    </div>
  );
};

export default ModalPizza;
