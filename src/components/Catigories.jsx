import React, { useContext } from "react";
import { SearchContext } from "../App.js";

const Catigories = ({ categoryId, onClickCategory }) => {
  const { setSearchValue } = useContext(SearchContext);

  const catigories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {catigories.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              onClickCategory(index);
              setSearchValue("");
            }}
            className={categoryId === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catigories;
