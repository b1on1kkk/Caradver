import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Car } from "../middleware_interfaces/middleware_interfaces";

interface TCars {
  cars: Car[];
  error: AxiosError | null;
  loading: "loading" | "loaded";
}

const initialState: TCars = {
  cars: [],
  error: null,
  loading: "loading"
};

export const getCars = createAsyncThunk(
  "allCars/getCars",
  async (query: string, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:2000/cars?${query}`);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const Cars = createSlice({
  name: "Cars",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      const { id, status } = action.payload;

      const localStorageData: Car[] = JSON.parse(
        localStorage.getItem("preBooked")!
      );

      const newLocalStorageData: Car[] = [];

      newLocalStorageData.push(
        ...localStorageData.map((car) => {
          if (car.id === id) return { ...car, book_status: status };
          return car;
        })
      );

      localStorage.setItem("preBooked", JSON.stringify(newLocalStorageData));

      return {
        ...state,
        cars: [
          ...state.cars.map((car) => {
            if (car.id === id) return { ...car, book_status: status };
            return { ...car };
          })
        ]
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.fulfilled, (state, action) => {
        if (action.payload.data) state.error = null;

        const localStorageData: Car[] = JSON.parse(
          localStorage.getItem("preBooked")!
        );

        console.log(action.payload.data);

        if (localStorageData) {
          state.cars = action.payload.data.map((car: Car) => {
            const localStorageCar = localStorageData.find(
              (preCar) => preCar.id === car.id
            );

            if (localStorageCar && localStorageCar.id === car.id)
              return { ...car, book_status: localStorageCar.book_status };

            return {
              ...car,
              book_status: localStorageCar ? "prebooked" : "none"
            };
          });
        } else state.cars = action.payload.data;

        state.loading = "loaded";
      })
      .addCase(getCars.rejected, (state, action) => {
        state.error = action.error as AxiosError;
      });
  }
});

export const { changeStatus } = Cars.actions;

export default Cars;
