import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice.ts";
import cart from "./slices/cartSlice.ts";
import pizza from "./slices/pizzaSlice.ts";
import modalPizza from "./slices/modalPizzaSlice.ts";
import promo from "./slices/promoSlice.ts";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    modalPizza,
    promo,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
