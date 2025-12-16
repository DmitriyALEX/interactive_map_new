import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { IFetchedUser } from "../types/fetchedUsers.interface";
import type { IUsersState } from "../types/usersState.interface";

const initialState: IUsersState = {
  users: [],
  selectedTags: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get<IFetchedUser[]>("/api/users.json");
  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedTags(state, action: PayloadAction<string[]>) {
      state.selectedTags = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IFetchedUser[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed";
      });
  },
});

export const { setSelectedTags } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
