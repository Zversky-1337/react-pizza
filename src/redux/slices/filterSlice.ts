import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SortState {
  name: string;
  sortProperty: string;
}

export interface FilterState {
  categoryId: number;
  sort: SortState;
  searchValue: string;
  page: number;
}

interface SetFiltersPayload {
  page: number | string;
  categoryId: number | string;
  sort: SortState;
}

const initialState: FilterState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  searchValue: "",
  page: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortState>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<SetFiltersPayload>) {
      state.page = Number(action.payload.page);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue, setFilters, setCategoryId, setSort } =
  filterSlice.actions;

export default filterSlice.reducer;
