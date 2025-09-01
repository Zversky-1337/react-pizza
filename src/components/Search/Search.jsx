import React, { useContext, useRef } from "react";
import styles from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice.js";

const Search = () => {
  const searchValue = useSelector((state) => state.filter.searchValue);
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  const clearInput = () => {
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={searchValue}
        onChange={onChangeInput}
        className={`${styles.input} ${searchValue ? styles.active : ""}`}
        placeholder="Поиск пиццы..."
        type="text"
      />
      {searchValue && (
        <img
          className={styles.img}
          src="https://i.postimg.cc/rw3h5qNZ/3671740-close-icon.png"
          alt="close"
          onClick={clearInput}
        />
      )}
    </div>
  );
};

export default Search;
