import React from "react";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/slices/filterSlice.js";

// TODO сдеалть бесконоченый скролл
const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.page);
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className={styles.pagination}>
      {pages.map((num) => (
        <button
          key={num}
          className={`${styles.item} ${currentPage === num ? styles.active : ""}`}
          onClick={() => dispatch(setPage(num))}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
