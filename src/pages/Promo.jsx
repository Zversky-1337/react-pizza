import React, { useEffect } from "react";
import styles from "./Promo.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromo } from "../redux/slices/promoSlice.js";

const Promo = () => {
  const dispatch = useDispatch();
  const { promo, status } = useSelector((state) => state.promo);

  useEffect(() => {
    dispatch(fetchPromo());
  }, [dispatch]);

  // TODO skeleton to loading
  if (status === "loading") return <p>Загрузка...</p>;
  if (status === "error") return <p>Ошибка при загрузке промо.</p>;

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
