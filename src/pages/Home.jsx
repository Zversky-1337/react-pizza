import Catigories from "../components/Catigories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useContext, useEffect, useState } from "react";
import Pagination from "../components/Pagination/Pagination.jsx";
import { SearchContext } from "../App.js";

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.startsWith("-") ? "desc" : "asc";
    const sortBy = sortType.sortProperty.replace("-", "");

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const query = category
      ? `?${category}&sortBy=${sortBy}&order=${order}`
      : `?sortBy=${sortBy}&order=${order}`;

    fetch(`https://68a5ec282a3deed2960f5c6a.mockapi.io/items${query}`)
      .then((response) => response.json())
      .then((arr) => {
        setItems(() => arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Catigories
            categoryId={categoryId}
            onClickCategory={(id) => setCategoryId(id)}
          />
          <Sort sortType={sortType} onChangeSort={(id) => setSortType(id)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination currentPage={page} onChangePage={setPage} />
      </div>
    </>
  );
};

export default Home;
