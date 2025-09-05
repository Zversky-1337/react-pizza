import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface Profile {
  id: string;
  name: string;
  phoneNumber: string;
  birthdayDay: string;
  birthdayMonth: string;
  birthdayYear: string;
  email: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

// 🔹 Получение профиля
export const fetchProfile = createAsyncThunk<Profile | null>(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<Profile[]>("http://localhost:4001/profile");
      if (res.data.length === 0) return null;
      return res.data[res.data.length - 1]; // последний объект
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Ошибка при загрузке профиля");
    }
  },
);

// 🔹 Сохранение нового профиля
export const saveProfile = createAsyncThunk<Profile, Omit<Profile, "id">>(
  "profile/saveProfile",
  async (data, { rejectWithValue }) => {
    try {
      const newId = Date.now().toString();
      const res = await axios.post<Profile>("http://localhost:4001/profile", {
        id: newId,
        ...data,
      });
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Ошибка при сохранении профиля");
    }
  },
);

// 🔹 Обновление существующего профиля
export const updateProfile = createAsyncThunk<Profile, Profile>(
  "profile/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put<Profile>(
        `http://localhost:4001/profile/${data.id}`,
        data,
      );
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Ошибка при обновлении профиля");
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<Profile | null>) => {
          state.loading = false;
          state.profile = action.payload;
        },
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // saveProfile
      .addCase(
        saveProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.profile = action.payload;
        },
      )
      .addCase(saveProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // updateProfile
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.profile = action.payload;
        },
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
