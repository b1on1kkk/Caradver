import type { TBookedCarInf } from "../../../store/middleware_interfaces/middleware_interfaces";

export function ExistanceInBookedCarArray(
  bookedService: TBookedCarInf[],
  id: number
) {
  return bookedService.find((car) => car.car_list_id === id);
}
