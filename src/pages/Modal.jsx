import React, { useEffect } from "react";
import ModalPizza from "../modal/ModalPizza.jsx";
import styles from "./Modal.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPizzaById,
  fetchToppings,
  setSelectedPizza,
} from "../redux/slices/modalPizzaSlice.js";

const Modal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedPizza, modalError } = useSelector(
    (state) => state.modalPizza,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPizzaById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedPizza) {
      dispatch(fetchToppings());
    }
  }, [selectedPizza, dispatch]);

  if (modalError) return <p>{modalError}</p>;
  if (!selectedPizza) return <p>Загрузка пиццы...</p>;

  const closeModal = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
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
