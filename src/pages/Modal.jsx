import React, {useEffect} from "react";
import ModalPizza from "../modal/ModalPizza.jsx";
import styles from "./Modal.module.scss";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchToppings, setSelectedPizza,} from "../redux/slices/modalPizzaSlice.js";

const Modal = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {selectedPizza} = useSelector((state) => state.modalPizza);

  // TODO fetch pizza by id if not in state
  useEffect(() => {
    if (!id) return;
    // fetch
  }, [id, dispatch]);

  useEffect(() => {
    if (!selectedPizza) return;
    dispatch(fetchToppings());
  }, [selectedPizza, dispatch]);

  if (!selectedPizza) return <p>Пицца не выбрана</p>;

  const closeModal = () => {
    navigate("/", { replace: true });
    dispatch(setSelectedPizza(null));
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
