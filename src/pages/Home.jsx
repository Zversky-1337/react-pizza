import React, { useEffect, useState } from "react";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter.jsx";
import { fetchPizzas } from "../redux/slices/pizzaSlice.js";
import { setVisibleCount } from "../redux/slices/filterSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, sort, searchValue, visibleCount } = useSelector(
    (state) => state.filter,
  );
  const sortType = sort.sortProperty;

  const navigate = useNavigate();
  const location = useLocation();

  const getPizzas = () => {
    const order = sortType.startsWith("-") ? "desc" : "asc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}&` : "";

    dispatch(fetchPizzas({ order, sortBy, category }));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
    dispatch(setVisibleCount(10));
  }, [categoryId, sortType]);


  // TODO Поменять пагинацию на /products?_page=1&_per_page=25 и бесконечную ленту через react course
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        dispatch(setVisibleCount(Math.min(visibleCount + 10, items.length)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, items.length]);

  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .slice(0, visibleCount)
    .map((obj, index) => (
      <div
        key={`${obj.id}-${index}`}
        onClick={() =>
          navigate(`/modal/${obj.id}`, {
            state: { background: location, pizza: obj },
          })
        }
      >
        <PizzaBlock {...obj} />
      </div>
    ));

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <Filter />

      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <h2>Пиццы не доступны из-за неполадок на сервере:(</h2>
      ) : (
        <div className="content__items">
          {pizzas}
          {status === "loading" && skeletons}
        </div>
      )}
    </div>
  );
};

export default Home;
