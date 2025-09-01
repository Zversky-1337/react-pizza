import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice.js";
import cart from "./slices/cartSlice.js";
import pizza from "./slices/pizzaSlice.js";
import modalPizza from "./slices/modalPizzaSlice.js";
import promo from "./slices/promoSlice.js";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    modalPizza,
    promo,
  },
});
