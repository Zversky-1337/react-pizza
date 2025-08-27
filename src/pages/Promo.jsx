import React, { useEffect, useState } from "react";
import styles from "./Promo.module.scss";
import { Link } from "react-router-dom";
//TODO: loading error
const Promo = () => {
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    //TODO try catch add loading
    fetch("http://localhost:4000/promo")
      .then((res) => res.json())
      .then((data) => setPromo(data))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  return (
    <div className={styles.root}>
      {promo.map((obj) => (
        <div className={styles.card} key={obj.id}>
          <img src={obj.promoURL} alt="promo" />
          <h2>{obj.title}</h2>
          <h4>{obj.text}</h4>
          <Link to="/">Посмотреть</Link>
        </div>
      ))}
    </div>
  );
};

export default Promo;
