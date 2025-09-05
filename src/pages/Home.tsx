import React, { useEffect } from "react";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock.js";
import Skeleton from "../components/PizzaBlock/Skeleton.js";
import Filter from "../components/Filter.tsx";
import { fetchPizzas, setPage, setItems } from "../redux/slices/pizzaSlice.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.ts";

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

  // Сброс при смене фильтра, сортировки или поиска
  useEffect(() => {
    dispatch(setPage(1));
    dispatch(setItems([]));
  }, [categoryId, sortType, searchValue, dispatch]);

  // Загрузка пицц
  useEffect(() => {
    const category = categoryId > 0 ? categoryId : undefined;
    dispatch(
      fetchPizzas({ category, sortType, page, limit, search: searchValue }),
    );
  }, [categoryId, sortType, page, limit, searchValue, dispatch]);

  // Бесконечная прокрутка (только если нет поиска)
  useInfiniteScroll({
    fetchMore: () => dispatch(setPage(page + 1)),
    hasMore: !searchValue && items.length < totalCount,
    loading: status === "loading",
  });

  // Фильтрация локально, если есть searchValue
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

  return (
    <div className="container">
      <Filter />
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <h2>Пиццы не доступны из-за неполадок на сервере :(</h2>
      ) : (
        <div className="content__items">
          {pizzas}
          {status === "loading" &&
            [...Array(6)].map((_, i) => <Skeleton key={i} />)}
        </div>
      )}
    </div>
  );
};

export default Home;
