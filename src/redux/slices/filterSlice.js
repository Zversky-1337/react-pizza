import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  searchValue: "",
  visibleCount: 10,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setFilters(state, action) {
      state.page = Number(action.payload.page);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setVisibleCount(state, action) {
      state.visibleCount = action.payload;
    },
  },
});

export const {
  setVisibleCount,
  setSearchValue,
  setFilters,
  setCategoryId,
  setSort,
} = filterSlice.actions;

export default filterSlice.reducer;
