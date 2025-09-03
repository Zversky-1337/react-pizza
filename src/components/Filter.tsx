import React from "react";
import { setCategoryId } from "../redux/slices/filterSlice.ts";
import Sort from "./Sort.tsx";
import Catigories from "./Catigories.tsx";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useAppSelector((state) => state.filter);

  const onChangeCategory = (id: number) => {
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
