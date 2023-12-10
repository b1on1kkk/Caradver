import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BookedCar } from "../middleware_interfaces/middleware_interfaces";

interface TBookedCars {
  booked_car: BookedCar[];
  error: any;
}

const initialState: TBookedCars = {
  booked_car: [],
  error: null
};

export const getBookedCar = createAsyncThunk(
  "Car/getBookedCar",
  async (query: number, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:2000/booked_car_by_id?id=${query}`
      );

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const Car = createSlice({
  name: "Car",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookedCar.fulfilled, (state, action) => {
        if (action.payload.data) state.error = null;
        state.booked_car = action.payload.data;
      })
      .addCase(getBookedCar.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export default Car;
