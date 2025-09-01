import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
  countPizzaCart: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
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

      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0,
      );
      state.countPizzaCart = state.items.reduce(
        (total, item) => total + item.count,
        0,
      );
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.countPizzaCart = state.items.reduce(
        (total, item) => total + item.count,
        0,
      );
    },
    clearItems(state) {
      state.items = [];
      state.countPizzaCart = 0;
      state.totalPrice = 0;
    },

    clearPosition(state, action) {
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

      // Пересчитываем счетчики
      state.countPizzaCart = state.items.reduce(
        (total, item) => total + item.count,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.count,
        0,
      );
    },

    incrementItem(state, action) {
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
      state.countPizzaCart = state.items.reduce(
        (total, item) => total + item.count,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0,
      );
    },

    decrementItem(state, action) {
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
        // Удаляем только эту конкретную позицию
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
      state.countPizzaCart = state.items.reduce(
        (total, item) => total + item.count,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0,
      );
    },
  },
});

export const selectCart = (state) => state.cart;

export const {
  clearPosition,
  decrementItem,
  incrementItem,
  addItem,
  removeItem,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
