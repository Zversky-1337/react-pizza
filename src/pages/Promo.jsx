import React, { useEffect } from "react";
import styles from "./Promo.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromo } from "../redux/slices/promoSlice.js";
import SkeletonPromo from "../modal/SkeletonPromo.jsx";

const Promo = () => {
  const dispatch = useDispatch();
  const { promo, status } = useSelector((state) => state.promo);

  useEffect(() => {
    dispatch(fetchPromo());
  }, [dispatch]);

  // TODO skeleton to loading
  if (status === "error") return <p>Ошибка при загрузке промо.</p>;

  const promoCompany = promo.map((obj) => (
    <div className={styles.card} key={obj.id}>
      <img src={obj.promoURL} alt="promo" />
      <h2>{obj.title}</h2>
      <h4>{obj.text}</h4>
      <Link to="/">Посмотреть</Link>
    </div>
  ));

  const skeletons = Array.from({ length: 6 }, (_, i) => (
    <div className={styles.card} key={i}>
      <SkeletonPromo />
    </div>
  ));

  return (
    <div className={styles.root}>
      {status === "loading" ? skeletons : promoCompany}
    </div>
  );
};

export default Promo;
