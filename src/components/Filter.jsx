import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice.js";
import Sort from "./Sort.jsx";
import Catigories from "./Catigories.jsx";

const Filter = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector((state) => state.filter);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="content__top">
      <Catigories categoryId={categoryId} onClickCategory={onChangeCategory} />
      <Sort />
    </div>
  );
};

export default Filter;
