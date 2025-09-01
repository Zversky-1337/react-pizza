import { useDispatch } from "react-redux";
import { setSearchValue } from "../redux/slices/filterSlice.js";

const Catigories = ({ categoryId, onClickCategory }) => {
  const dispatch = useDispatch();

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
