import { Car } from "../../../store/features/getCars.slice";

export function CheckForExistance(car: Car, preBookCars: Car[]) {
  try {
    preBookCars.forEach((preCar) => {
      if (preCar.id === car.id) throw new Error();
    });
  } catch (error) {
    return true;
  }
  return false;
}
