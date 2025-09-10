import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";
import type { CartItemType, CartState } from "../../types/types.ts";
import type { AxiosError } from "axios";
import axios from "axios";

export type CartItemInput = Omit<CartItemType, "count">;
export type CartKey = Pick<CartItemType, "id" | "type" | "size" | "price">;

interface OrderData {
  time: string;
  amount: string;
  payment: string;
  receipt: string;
}

// ✅ типизированный createAsyncThunk
export const payOrder = createAsyncThunk<
  OrderData, // успех
  void, // аргументы (ничего не передаём)
  { rejectValue: string } // ошибка
>("cart/payOrder", async (_, { getState, dispatch, rejectWithValue }) => {
  const state = getState() as RootState;
  const { totalPrice, countPizzaCart } = state.cart;

  if (countPizzaCart === 0) {
    return rejectWithValue("Корзина пуста");
  }

  const orderData: OrderData = {
    time: new Date().toISOString(),
    amount: String(totalPrice),
    payment: "Оплата картой",
    receipt: "Скачать",
  };

  try {
    await axios.post("http://localhost:4001/orders", orderData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch(clearItems());
    return orderData;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Ошибка при оплате",
    );
  }
});

const loadCart = (): CartState => {
  try {
    const data = localStorage.getItem("cart");
    if (data) return JSON.parse(data) as CartState;
  } catch (e) {
    console.error("Ошибка загрузки корзины:", e);
  }
  return {
    totalPrice: 0,
    items: [],
    countPizzaCart: 0,
    status: "idle",
    error: null,
  };
};

const saveCart = (state: CartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (e) {
    console.error("Ошибка сохранения корзины:", e);
  }
};

const initialState: CartState = loadCart();

const recalcTotals = (state: CartState) => {
  state.countPizzaCart = state.items.reduce(
    (total, item) => total + item.count,
    0,
  );
  state.totalPrice = state.items.reduce(
    (sum, obj) => sum + obj.price * obj.count,
    0,
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemInput>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.price === action.payload.price &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      findItem
        ? findItem.count++
        : state.items.push({ ...action.payload, count: 1 });

      recalcTotals(state);
      saveCart(state);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      recalcTotals(state);
      saveCart(state);
    },
    clearItems(state) {
      state.items = [];
      state.countPizzaCart = 0;
      state.totalPrice = 0;
      saveCart(state);
    },
    clearPosition(state, action: PayloadAction<CartKey>) {
      const { id, type, size, price } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.id === id &&
            item.type === type &&
            item.size === size &&
            item.price === price
          ),
      );

      recalcTotals(state);
      saveCart(state);
    },
    incrementItem(state, action: PayloadAction<CartKey>) {
      const { id, type, size, price } = action.payload;

      const item = state.items.find(
        (obj) =>
          obj.id === id &&
          obj.type === type &&
          obj.size === size &&
          obj.price === price,
      );

      if (item) {
        item.count++;
      }

      recalcTotals(state);
      saveCart(state);
    },
    decrementItem(state, action: PayloadAction<CartKey>) {
      const { id, type, size, price } = action.payload;

      const item = state.items.find(
        (obj) =>
          obj.id === id &&
          obj.type === type &&
          obj.size === size &&
          obj.price === price,
      );

      if (item && item.count > 1) {
        item.count--;
      } else if (item) {
        state.items = state.items.filter(
          (obj) =>
            !(
              obj.id === id &&
              obj.type === type &&
              obj.size === size &&
              obj.price === price
            ),
        );
      }

      recalcTotals(state);
      saveCart(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(payOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.status = "succeeded";
        saveCart(state);
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка при оплате";
      });
  },
});

export const selectCart = (state: RootState) => state.cart;

export const {
  clearPosition,
  decrementItem,
  incrementItem,
  addItem,
  removeItem,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
