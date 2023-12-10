import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { TBookedService } from "../middleware_interfaces/middleware_interfaces";

interface TBookedServices {
  booked_serives: TBookedService[];
  error: any;
}

const initialState: TBookedServices = {
  booked_serives: [],
  error: null
};

export const getAllBookedServices = createAsyncThunk(
  "Car/getBookedCar",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:2000/booked_services`);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const BookedServices = createSlice({
  name: "BookedServices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookedServices.fulfilled, (state, action) => {
        if (action.payload.data) state.error = null;
        state.booked_serives = action.payload.data;
      })
      .addCase(getAllBookedServices.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export default BookedServices;
