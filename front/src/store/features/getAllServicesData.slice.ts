import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { TSeriveProps } from "../middleware_interfaces/middleware_interfaces";

interface TAllServices {
  data: TSeriveProps[][];
}

const initialState: TAllServices = {
  data: []
};

export const getAllServices = createAsyncThunk(
  "allServices/getAllServices",
  async () => {
    const res = await axios.get(`http://localhost:2000/all_service`);

    const SERVICE_A_BLOCK_STATIONS: any[] = [];
    const SERVICE_B_BLOCK_STATIONS: any[] = [];

    res.data.forEach((item: any) => {
      if (item.id.split("")[0] === "A") SERVICE_A_BLOCK_STATIONS.push(item);
      else SERVICE_B_BLOCK_STATIONS.push(item);
    });

    const middleIndex = Math.ceil(res.data.length / 2);
    const firstHalf = res.data.slice(0, middleIndex);
    const secondHalf = res.data.slice(middleIndex);

    return [[...firstHalf], [...secondHalf]];
  }
);

const allServices = createSlice({
  name: "allService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  }
});

export default allServices;
