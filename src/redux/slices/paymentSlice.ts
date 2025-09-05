import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface Card {
  id: string;
  card: string;
}

interface PaymentState {
  toggleInput: boolean;
  cards: Card[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PaymentState = {
  toggleInput: false,
  cards: [],
  status: "idle",
  error: null,
};

// Загрузить все карты
export const fetchCards = createAsyncThunk<Card[]>(
  "payment/fetchCards",
  async () => {
    const res = await axios.get("http://localhost:4001/cards");
    return res.data;
  },
);

// Добавить карту
export const addCard = createAsyncThunk<Card, string>(
  "payment/addCard",
  async (cardNumber: string) => {
    const newCard: Card = { id: Date.now().toString(), card: cardNumber };
    const res = await axios.post("http://localhost:4001/cards", newCard);
    return res.data;
  },
);

// Удалить карту
export const deleteCard = createAsyncThunk<string, string>(
  "payment/deleteCard",
  async (id: string) => {
    await axios.delete(`http://localhost:4001/cards/${id}`);
    return id;
  },
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    toggleInput(state, action: PayloadAction<boolean>) {
      state.toggleInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCards
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Ошибка загрузки карт";
      })
      // addCard
      .addCase(addCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      })
      // deleteCard
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter((c) => c.id !== action.payload);
      });
  },
});

export const { toggleInput } = paymentSlice.actions;
export default paymentSlice.reducer;
