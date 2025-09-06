import React, { useRef } from "react";
import styles from "./Search.module.scss";
import { setSearchValue } from "../../redux/slices/filterSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";

const Search: React.FC = () => {
  const searchValue = useAppSelector((state) => state.filter.searchValue);
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
