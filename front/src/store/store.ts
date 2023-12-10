import { configureStore } from "@reduxjs/toolkit";

import UserTodos from "./features/addingTodos.slice";
import allService from "./features/serviceData.slice";
import allServices from "./features/getAllServicesData.slice";
import User from "./features/getUser.slice";
import Cars from "./features/getCars.slice";
import PreBook from "./features/preBook.slice";
import Car from "./features/getBookedCar.slice";
import allBookedCars from "./features/getAllBookedCars.slice";
import BookedServices from "./features/getAllBookedServices.slice";

export const store = configureStore({
  reducer: {
    userTodos: UserTodos.reducer,
    getService: allService.reducer,
    getAllServices: allServices.reducer,
    getUser: User.reducer,
    getCars: Cars.reducer,
    preBookCar: PreBook.reducer,
    bookedCar: Car.reducer,
    allBookedCars: allBookedCars.reducer,
    BookedServices: BookedServices.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
