import React, { useContext, useRef } from "react";
import styles from "./Search.module.scss";
import { SearchContext } from "../../App.js";

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue("");
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
