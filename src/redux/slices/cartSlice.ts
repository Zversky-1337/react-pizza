import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";
import type { CartItemType, CartState } from "../../types/types.ts";

export type CartItemInput = Omit<CartItemType, "count">;

export type CartKey = Pick<CartItemType, "id" | "type" | "size" | "price">;

const initialState: CartState = {
  totalPrice: 0,
  items: [],
  countPizzaCart: 0,
};

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
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      recalcTotals(state);
    },
    clearItems(state) {
      state.items = [];
      state.countPizzaCart = 0;
      state.totalPrice = 0;
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

      // пересчёт
      recalcTotals(state);
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

      // Пересчитываем счетчики
      recalcTotals(state);
    },
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
