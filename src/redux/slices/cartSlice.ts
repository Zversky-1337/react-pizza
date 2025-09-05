import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";
import type { CartItemType, CartState } from "../../types/types.ts";

export type CartItemInput = Omit<CartItemType, "count">;

export type CartKey = Pick<CartItemType, "id" | "type" | "size" | "price">;

export const payOrder = createAsyncThunk(
  "cart/payOrder",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { totalPrice, countPizzaCart } = state.cart;

    if (countPizzaCart === 0) throw new Error("Корзина пуста");

    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1,
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours(),
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const orderData = {
      time: formattedTime,
      amount: String(totalPrice),
      payment: "Оплата картой",
      receipt: "Скачать",
    };

    const response = await fetch("http://localhost:4001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error("Ошибка при оплате");

    // Очистка корзины после успешного платежа
    dispatch(clearItems());

    return orderData; // можно использовать для уведомления пользователя
  },
);

const initialState: CartState = {
  totalPrice: 0,
  items: [],
  countPizzaCart: 0,
  status: "idle", // добавляем статус для отслеживания загрузки
  error: null as string | null,
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
  extraReducers: (builder) => {
    builder
      .addCase(payOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(payOrder.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Ошибка при оплате";
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
