import React, { useEffect } from "react";
import ModalPizza from "../modal/ModalPizza.jsx";
import styles from "./Modal.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchToppings,
  setSelectedPizza,
} from "../redux/slices/modalPizzaSlice.js";

const Modal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedPizza = location.state?.pizza;

  useEffect(() => {
    if (!selectedPizza) return;
    dispatch(setSelectedPizza(selectedPizza));
    dispatch(fetchToppings());
  }, [selectedPizza, dispatch]);

  if (!selectedPizza) return <p>Пицца не выбрана</p>;

  const closeModal = () => {
    if (location.state?.background) {
      navigate(location.state.background.pathname, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.card} onClick={(e) => e.stopPropagation()}>
          <ModalPizza />
        </div>
      </div>
    </>
  );
};

export default Modal;
