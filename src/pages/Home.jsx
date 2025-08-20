import Catigories from "../components/Catigories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://68a5ec282a3deed2960f5c6a.mockapi.io/items")
      .then((response) => response.json())
      .then((arr) => {
        setItems(() => arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Catigories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
