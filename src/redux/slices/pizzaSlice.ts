import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { Pizza } from "../../types/types.ts";

interface PizzaState {
  items: Pizza[];
  status: "loading" | "success" | "error";
  page: number;
  limit: number;
  totalCount: number;
}

interface FetchPizzasParams {
  category?: number;
  sortType?: string;
  page: number;
  limit: number;
  search?: string;
}

interface FetchPizzasResponse {
  pizzas: Pizza[];
  totalCount: number;
}

const SLICE_NAME = "pizza";

export const fetchPizzas = createAsyncThunk<
  FetchPizzasResponse,
  FetchPizzasParams
>(
  `${SLICE_NAME}/fetchPizzas`,
  async ({ category, sortType, page, limit, search }) => {
    const params: {
      category?: number;
      _sort?: string;
      _page?: number;
      per_page?: number;
      _limit?: number;
    } = { category, _sort: sortType };

    if (search) {
      params._limit = 1000;
    } else {
      params._page = page;
      params.per_page = limit;
    }

    const res = await axios.get("http://localhost:4001/products", { params });

    const pizzas: Pizza[] = res.data.data ?? res.data;
    const totalCount = search
      ? pizzas.length
      : (res.data.items ?? pizzas.length);

    console.log(pizzas);
    console.log(totalCount);

    return { pizzas, totalCount };
  },
);

const initialState: PizzaState = {
  items: [],
  status: "loading",
  page: 1,
  limit: 10,
  totalCount: 0,
};

export const pizzaSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = "success";
        state.items =
          state.page === 1 || !!action.meta.arg.search
            ? action.payload.pizzas
            : [...state.items, ...action.payload.pizzas];
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setItems, setPage } = pizzaSlice.actions;
export default pizzaSlice.reducer;
