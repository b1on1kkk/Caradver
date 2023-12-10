import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { TBookedCarInf } from "../middleware_interfaces/middleware_interfaces";

interface TAllBookedCars {
  data: TBookedCarInf[];
}

const initialState: TAllBookedCars = {
  data: []
};

export const getAllBookedCars = createAsyncThunk(
  "allBookedCars/getAllBookedCars",
  async () => {
    const res = await axios.get(`http://localhost:2000/all_booked`);
    return res;
  }
);

const allBookedCars = createSlice({
  name: "allBookedCars",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      const { id, toChangeStatus } = action.payload;

      state.data = state.data.map((item) => {
        if (item.id === id) return { ...item, status: toChangeStatus };
        return item;
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBookedCars.fulfilled, (state, action) => {
      const static_booked_data = action.payload.data;
      const newArray: TBookedCarInf[] = [];

      static_booked_data.forEach((item: TBookedCarInf) =>
        newArray.push({ ...item, status: false })
      );

      state.data = newArray;
    });
  }
});

export const { changeStatus } = allBookedCars.actions;

export default allBookedCars;
