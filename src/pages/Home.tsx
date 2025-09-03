import React, { useEffect, useRef } from "react";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock.js";
import Skeleton from "../components/PizzaBlock/Skeleton.js";
import Filter from "../components/Filter.tsx";
import {
  fetchPizzas,
  fetchTotalCount,
  setPage,
  setItems,
} from "../redux/slices/pizzaSlice.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { items, status, page, limit, totalCount } = useAppSelector(
    (state) => state.pizza,
  );
  const { categoryId, sort, searchValue } = useAppSelector(
    (state) => state.filter,
  );
  const sortType = sort.sortProperty;

  const isFetching = useRef(false);

  useEffect(() => {
    dispatch(setPage(1));
    dispatch(setItems([]));
  }, [categoryId, sortType, dispatch]);

  useEffect(() => {
    const category = categoryId > 0 ? categoryId : undefined;

    dispatch(fetchTotalCount({ category }));

    dispatch(fetchPizzas({ category, sortType, page, limit }));
  }, [categoryId, sortType, page, limit, dispatch]);

  // Бесконечный скролл
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (nearBottom && !isFetching.current && items.length < totalCount) {
        isFetching.current = true;
        dispatch(setPage(page + 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, items.length, totalCount, page]);

  useEffect(() => {
    if (status === "success" || status === "error") {
      isFetching.current = false;
    }
  }, [status]);

  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
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
        <h2>Пиццы не доступны из-за неполадок на сервере :(</h2>
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
