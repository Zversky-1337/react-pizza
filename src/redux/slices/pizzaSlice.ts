import {
  createAsyncThunk,
  createSlice,
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

const SLICE_NAME = "pizza";

export const fetchTotalCount = createAsyncThunk<number, { category?: number }>(
  `${SLICE_NAME}/fetchTotalCount`,
  async ({ category }) => {
    const { data } = await axios.get("http://localhost:4000/products", {
      params: { category },
    });
    return data.length;
  },
);

export const fetchPizzas = createAsyncThunk<
  Pizza[],
  { category?: number; sortType?: string; page: number; limit: number }
>(`${SLICE_NAME}/fetchPizzas`, async ({ category, sortType, page, limit }) => {
  const { data } = await axios.get("http://localhost:4000/products", {
    params: { category, _sort: sortType, _page: page, _limit: limit },
  });
  return data;
});

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
        if (state.page === 1) {
          state.items = action.payload;
        } else {
          state.items = [...state.items, ...action.payload];
        }
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchTotalCount.fulfilled, (state, action) => {
        state.totalCount = action.payload;
      });
  },
});

export const { setItems, setPage } = pizzaSlice.actions;
export default pizzaSlice.reducer;
