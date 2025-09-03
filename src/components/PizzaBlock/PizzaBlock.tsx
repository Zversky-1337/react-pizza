import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSelectedPizza } from "../../redux/slices/modalPizzaSlice.ts";
import { useAppDispatch } from "../../hooks/redux.ts";
import type { Pizza } from "../../types/types.ts";

interface PizzaBlockProps extends Pizza {}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
  toppings,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const typeNames: string[] = ["тонкое", "традиционное"];
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);

  const handleClick = () => {
    navigate(`/modal/${id}`);
    dispatch(
      setSelectedPizza({
        id,
        title,
        price,
        imageUrl,
        types,
        sizes,
        toppings,
      }),
    );
  };

  return (
    <div className="pizza-block-wrapper">
      <div onClick={handleClick} className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt={title} />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId, i) => (
              <li
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveType(i);
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSize(i);
                }}
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
