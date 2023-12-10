import { Car } from "../../../store/features/getCars.slice";

export function SaveToBook(
  user_existance: number,
  bookedIdxes: number[],
  id: number,
  preBookCars: Car[],
  car: Car,
  removePreCarCallback: () => void,
  addPreCarCallback: () => void
) {
  if (user_existance > 0) {
    // console.log()

    if (!bookedIdxes.includes(id)) {
      const indexToRemove = preBookCars.findIndex((preCar) => preCar.id === id);

      if (preBookCars.includes(car) || indexToRemove !== -1) {
        removePreCarCallback();
        return;
      }

      addPreCarCallback();
    }
  }
}
