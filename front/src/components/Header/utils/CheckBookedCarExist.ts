import type { Car } from "../../../store/middleware_interfaces/middleware_interfaces";

export function CheckBookedCarExist(preBookedCars: Car[]) {
  try {
    preBookedCars.forEach((car) => {
      if (car.book_status === "booked") throw new Error();
    });

    return false;
  } catch (error) {
    return true;
  }
}
