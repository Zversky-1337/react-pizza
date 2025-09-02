import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedPizza } from "../../redux/slices/modalPizzaSlice.js";

const PizzaBlock = ({ title, price, imageUrl, sizes, types, toppings, id }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const typeNames = ["тонкое", "традиционное"];
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  return (
    <div className="pizza-block-wrapper">
      <div
        onClick={() => {
          navigate(`/modal/${id}`);
          dispatch(
            setSelectedPizza({
              title,
              price,
              imageUrl,
              sizes,
              types,
              toppings,
              id,
              location,
            }),
          );
        }}
        className="pizza-block"
      >
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId, i) => (
              <li
                key={i}
                onClick={() => setActiveType(i)}
                className={activeType === i ? "active" : ""}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button className="button button--outline button--add">
            <span>Выбрать</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
