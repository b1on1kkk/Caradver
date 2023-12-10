import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import {
  TStaticService,
  TBookedService
} from "../middleware_interfaces/middleware_interfaces";

interface TServiceBlock {
  static_service: TStaticService[];
  booked_service: TBookedService[];
}

const initialState: TServiceBlock = {
  static_service: [],
  booked_service: []
};

export const getService = createAsyncThunk(
  "allService/getService",
  async (id: string) => {
    const res = await axios.get(`http://localhost:2000/service?block=${id}`);
    return res;
  }
);

export const getBookedService = createAsyncThunk(
  "allService/getBookedService",
  async (id: string) => {
    const res = await axios.get(
      `http://localhost:2000/booked_service?id=${id}`
    );
    return res;
  }
);

const allService = createSlice({
  name: "allService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getService.fulfilled, (state, action) => {
      state.static_service = action.payload.data;
    });
    builder.addCase(getBookedService.fulfilled, (state, action) => {
      state.booked_service = action.payload.data;
    });
  }
});

export default allService;
