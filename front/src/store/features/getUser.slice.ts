import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { TUserProps } from "../middleware_interfaces/middleware_interfaces";

interface TUser {
  user: TUserProps[];
  error: AxiosError | null;
}

const initialState: TUser = {
  user: [],
  error: null
};

export const getUser = createAsyncThunk(
  "allServices/getUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:2000/user`);

      if (!localStorage.getItem("preBooked"))
        localStorage.setItem("preBooked", res.data[0].localstorage);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const User = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload.data) state.error = null;

        state.user = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error as AxiosError;
      });
  }
});

export default User;
