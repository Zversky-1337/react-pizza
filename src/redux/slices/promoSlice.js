import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPromo = createAsyncThunk("promo/fetchPromo", async () => {
  const { data } = await axios.get("http://localhost:4000/promo");
  return data;
});

const initialState = {
  promo: [],
  status: "loading",
};

export const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    setPromo: (state, action) => {
      state.promo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromo.pending, (state) => {
        state.status = "loading";
        state.promo = [];
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.promo = action.payload; // исправлено
        state.status = "success";
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.status = "error";
        state.promo = [];
      });
  },
});

export const { setPromo } = promoSlice.actions;

export default promoSlice.reducer;
