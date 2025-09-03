import { setSearchValue } from "../redux/slices/filterSlice.ts";
import { useAppDispatch } from "../hooks/redux.ts";
import React from "react";

interface CategoriesProps {
  categoryId: number;
  onClickCategory: (id: number) => void;
}

const Catigories: React.FC<CategoriesProps> = ({
  categoryId,
  onClickCategory,
}) => {
  const dispatch = useAppDispatch();

  const catigories: string[] = [
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
              dispatch(setSearchValue(""));
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
