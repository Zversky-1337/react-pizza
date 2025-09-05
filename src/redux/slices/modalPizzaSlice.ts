import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { Pizza, Topping } from "../../types/types.ts";

export interface ModalPizzaState {
  selectedPizza: null | Pizza;
  activeType: number;
  activeSize: number;
  selectedToppings: number[];
  price: number;
  toppings: Topping[];
  modalError: string | null | undefined;
}

export const fetchPizzaById = createAsyncThunk<Pizza, string>(
  "modalPizza/fetchPizzaById",
  async (id) => {
    const { data } = await axios.get(`http://localhost:4001/products/${id}`);
    return data;
  },
);

export const fetchToppings = createAsyncThunk<Topping[]>(
  "modalPizza/fetchToppings",
  async () => {
    const { data } = await axios.get("http://localhost:4001/toppings");
    return data;
  },
);

const initialState: ModalPizzaState = {
  selectedPizza: null,
  activeType: 0,
  activeSize: 0,
  selectedToppings: [],
  price: 0,
  toppings: [],
  modalError: null,
};

export const modalPizzaSlice = createSlice({
  name: "modalPizza",
  initialState,
  reducers: {
    setSelectedPizza: (state, action: PayloadAction<Pizza | null>) => {
      const pizza = action.payload;
      state.selectedPizza = pizza;
      state.price = pizza ? pizza.price : 0;
      state.activeSize = 0;
      state.activeType = 0;
      state.selectedToppings = [];
    },
    setActiveType: (state, action: PayloadAction<number>) => {
      state.activeType = action.payload;
    },
    setActiveSize: (state, action: PayloadAction<number>) => {
      state.activeSize = action.payload;
    },
    toggleTopping: (state, action: PayloadAction<Topping>) => {
      const topping = action.payload;
      if (state.selectedToppings.includes(topping.id)) {
        state.selectedToppings = state.selectedToppings.filter(
          (id) => id !== topping.id,
        );
        state.price -= topping.price;
      } else {
        state.selectedToppings.push(topping.id);
        state.price += topping.price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaById.pending, (state) => {
        state.modalError = null;
        state.selectedPizza = null;
      })
      .addCase(fetchPizzaById.fulfilled, (state, action) => {
        state.selectedPizza = action.payload;
        state.price = action.payload.price;
        state.activeSize = 0;
        state.activeType = 0;
        state.selectedToppings = [];
      })
      .addCase(fetchPizzaById.rejected, (state) => {
        state.modalError = "Ошибка при загрузке пиццы";
        state.selectedPizza = null;
      })
      .addCase(fetchToppings.pending, (state) => {
        state.modalError = null;
      })
      .addCase(fetchToppings.fulfilled, (state, action) => {
        state.toppings = action.payload;
      })
      .addCase(fetchToppings.rejected, (state) => {
        state.modalError = "Ошибка при загрузке топпингов";
      });
  },
});

export const { toggleTopping, setActiveSize, setActiveType, setSelectedPizza } =
  modalPizzaSlice.actions;

export default modalPizzaSlice.reducer;
