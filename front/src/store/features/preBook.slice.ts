import { createSlice } from "@reduxjs/toolkit";

import { Car } from "../middleware_interfaces/middleware_interfaces";

const initialState: Car[] =
  JSON.parse(localStorage.getItem("preBooked")!) === null
    ? []
    : JSON.parse(localStorage.getItem("preBooked")!);

const PreBook = createSlice({
  name: "PreBook",
  initialState,
  reducers: {
    addPreCar: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("preBooked", JSON.stringify(state));
    },
    removePreCar: (state, action) => {
      const indexToRemove = state.findIndex((car) => car.id === action.payload);
      state.splice(indexToRemove, 1);
      localStorage.setItem("preBooked", JSON.stringify(state));
    },
    refrash: () => {
      return JSON.parse(localStorage.getItem("preBooked")!)
        ? [...JSON.parse(localStorage.getItem("preBooked")!)]
        : [];
    },
    clearPreCarStorage: (state, _) => {
      state.splice(0, state.length);
      localStorage.removeItem("preBooked");
    }
  }
});

export const { addPreCar, removePreCar, clearPreCarStorage, refrash } =
  PreBook.actions;

export default PreBook;
