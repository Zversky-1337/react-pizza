import React, { useEffect, useState } from "react";
import ModalPizza from "../modal/ModalPizza.jsx";
import styles from "./Modal.module.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// //TODO: page?
const Modal = ({state}) => {
  const [toppings, setToppings] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("productID"));

  const selectedPizza = location.state?.pizza;

  useEffect(() => {
    fetch("https://68a5ec282a3deed2960f5c6a.mockapi.io/topings")
      .then((response) => response.json())
      .then((arr) => {
        setToppings(() => arr);
      });
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/products?id=0")
  //       .then((response) => response.json())
  //       .then((arr) => {
  //         setToppings(() => arr);
  //       });
  // }, []);

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
