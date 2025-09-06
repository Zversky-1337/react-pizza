import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

type Order = {
  id?: string;
  time: string;
  amount: string;
  payment: string;
  receipt: string;
};

interface OrderHistoryState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderHistoryState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<Order[]>(
  "orderHistory/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<Order[]>("http://localhost:4001/orders");
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Неизвестная ошибка при загрузке заказов");
    }
  },
);

const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        },
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderHistorySlice.reducer;
