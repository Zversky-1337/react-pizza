import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface ObjPromo {
  id: number;
  promoURL: string;
  title: string;
  text: string;
}

export interface PromoState {
  promo: ObjPromo[];
  status: "loading" | "success" | "error";
}

export const fetchPromo = createAsyncThunk<ObjPromo[]>(
  "promo/fetchPromo",
  async () => {
    const { data } = await axios.get<ObjPromo[]>("http://localhost:4000/promo");
    return data;
  },
);

const initialState: PromoState = {
  promo: [],
  status: "loading",
};

export const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromo.pending, (state) => {
        state.status = "loading";
        state.promo = [];
      })
      .addCase(
        fetchPromo.fulfilled,
        (state, action: PayloadAction<ObjPromo[]>) => {
          state.promo = action.payload; // исправлено
          state.status = "success";
        },
      )
      .addCase(fetchPromo.rejected, (state) => {
        state.status = "error";
        state.promo = [];
      });
  },
});

export default promoSlice.reducer;
