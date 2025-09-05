import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice.ts";
import cart from "./slices/cartSlice.ts";
import pizza from "./slices/pizzaSlice.ts";
import modalPizza from "./slices/modalPizzaSlice.ts";
import promo from "./slices/promoSlice.ts";
import payment from "./slices/paymentSlice.ts";
import orderHistory from "./slices/orderHistorySlice.ts";
import personalData from "./slices/personalDataSlice.ts";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    modalPizza,
    promo,
    payment,
    orderHistory,
    personalData,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
