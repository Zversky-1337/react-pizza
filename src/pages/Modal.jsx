import React, { useEffect, useState } from "react";
import ModalPizza from "../modal/ModalPizza.jsx";
import styles from "./Modal.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Modal = () => {
  const [toppings, setToppings] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const selectedPizza = location.state?.pizza;

  useEffect(() => {
    fetch("https://68a5ec282a3deed2960f5c6a.mockapi.io/topings")
      .then((response) => response.json())
      .then((arr) => {
        setToppings(() => arr);
      });
  }, []);

  if (!selectedPizza) return <p>Пицца не выбрана</p>;

  return (
    <>
      <div className={styles.overlay} onClick={() => navigate(-1)}>
        <div className={styles.card} onClick={(e) => e.stopPropagation()}>
          <ModalPizza pizza={selectedPizza} toppings={toppings} />
        </div>
      </div>
    </>
  );
};

export default Modal;
