import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchToppings = createAsyncThunk(
  "modalPizza/fetchToppings",
  async () => {
    const { data } = await axios.get("http://localhost:4000/toppings");
    return data;
  },
);

const initialState = {
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
    setSelectedPizza: (state, action) => {
      state.selectedPizza = action.payload;
      state.price = action.payload ? action.payload.price : 0;
      state.activeSize = 0;
      state.activeType = 0;
      state.selectedToppings = [];
    },
    setActiveType: (state, action) => {
      state.activeType = action.payload;
    },
    setActiveSize: (state, action) => {
      state.activeSize = action.payload;
    },
    toggleTopping: (state, action) => {
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
