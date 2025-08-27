import Catigories from "../components/Catigories.jsx";
import Sort, { arrSortName } from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useContext, useEffect, useRef, useState } from "react";
import Pagination from "../components/Pagination/Pagination.jsx";
import { SearchContext } from "../App.js";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setFilters } from "../redux/slices/filterSlice.js";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, sort, page } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchPizzas = async () => {
    try {
      setIsLoading(true);
      const order = sortType.startsWith("-") ? "desc" : "asc";
      const sortBy = sortType.replace("-", "");
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const query = category
        ? `?${category}&sortBy=${sortBy}&order=${order}`
        : `?sortBy=${sortBy}&order=${order}`;

      const { data } = await axios.get(
        `https://68a5ec282a3deed2960f5c6a.mockapi.io/items${query}`,
      );
      setItems(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = arrSortName.find(
        (obj) => obj.sortProperty === params.sortProperty,
      );
      dispatch(
        setFilters({
          ...params,
          sort,
          categoryId: Number(params.categoryId),
          page: Number(params.page),
        }),
      );
    } else {
      fetchPizzas();
    }
  }, []);

  useEffect(() => {
    fetchPizzas();
  }, [categoryId, sortType, page]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      page,
    });
    navigate(`?${queryString}`, { replace: true });
  }, [categoryId, sortType, page]);

  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Catigories
            categoryId={categoryId}
            onClickCategory={onChangeCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination />
      </div>
    </>
  );
};

export default Home;
