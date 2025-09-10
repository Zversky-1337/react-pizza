import React, { useEffect } from "react";
import ModalPizza from "../modal/ModalPizza.tsx";
import styles from "./Modal.module.scss";
import { useParams } from "react-router-dom";
import {
  fetchPizzaById,
  fetchToppings,
  setSelectedPizza,
} from "../redux/slices/modalPizzaSlice.ts";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";

const Modal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedPizza, modalError } = useAppSelector(
    (state) => state.modalPizza,
  );

  // Загрузка пиццы по ID
  useEffect(() => {
    if (id) {
      dispatch(fetchPizzaById(id));
    }
  }, [id, dispatch]);

  // Загрузка топпингов, когда пицца есть
  useEffect(() => {
    if (selectedPizza) {
      dispatch(fetchToppings());
    }
  }, [selectedPizza, dispatch]);

  if (modalError) return <p>{modalError}</p>;
  if (!selectedPizza) return <p>Загрузка пиццы...</p>;

  const closeModal = () => {
    // Просто закрываем модалку, не навигируем
    dispatch(setSelectedPizza(null));
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <ModalPizza />
      </div>
    </div>
  );
};

export default Modal;
