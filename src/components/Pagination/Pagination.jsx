import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, onChangePage }) => {
  const pages = [1, 2, 3];

  return (
    <div className={styles.pagination}>
      {pages.map((num) => (
        <button
          key={num}
          className={`${styles.item} ${currentPage === num ? styles.active : ""}`}
          onClick={() => onChangePage(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
