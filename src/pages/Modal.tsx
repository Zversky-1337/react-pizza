import React, { useEffect } from "react";
import ModalPizza from "../modal/ModalPizza.tsx";
import styles from "./Modal.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  fetchPizzaById,
  fetchToppings,
  setSelectedPizza,
} from "../redux/slices/modalPizzaSlice.ts";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import type { Pizza } from "../types/types.ts";

interface LocationState {
  background?: Location;
  pizza?: Pizza;
}

const Modal: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedPizza, modalError } = useAppSelector(
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
    if (state?.background) {
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
