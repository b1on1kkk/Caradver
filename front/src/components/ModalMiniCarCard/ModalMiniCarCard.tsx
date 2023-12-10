import { NavLink } from "react-router-dom";

import type { Car } from "../../store/middleware_interfaces/middleware_interfaces";

// components
import ActionButton from "./util_components/ActionButton";
import DeleteActionButton from "./util_components/DeleteActionButton";
//

interface TModalMiniCarCard {
  car: Car;
  booked_car_exist: boolean;
  removingPreCar: () => void;
  confirmBookingCar: () => void;
  unbookCar: () => void;
}

export default function ModalMiniCarCard({
  car,
  booked_car_exist,
  removingPreCar,
  confirmBookingCar,
  unbookCar
}: TModalMiniCarCard) {
  return (
    <div className="flex gap-2 p-1 rounded-md hover:bg-gray-200 min-h-60 select-none">
      <NavLink to={`/Assets/${car.id}`} className="flex gap-2 flex-1">
        <div className="flex justify-center items-center">
          <img
            src={JSON.parse(car.pictures)[0]}
            alt={car.brand}
            className="w-65 rounded-md"
          />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <div className="text-sm">
            {car.brand} {car.make}
          </div>
          <div className="text-xs font-semibold">${car.price}</div>
        </div>
      </NavLink>

      <div className="flex items-center">
        <div className="flex gap-2">
          {booked_car_exist ? (
            <>
              {car.book_status === "booked" ? (
                <ActionButton
                  main_color="bg-red-400"
                  hover_color="bg-red-500"
                  actionCallback={unbookCar}
                >
                  Unbook
                </ActionButton>
              ) : (
                <DeleteActionButton deleteCallback={removingPreCar} />
              )}
            </>
          ) : (
            <>
              <ActionButton
                main_color="bg-blue-400"
                hover_color="bg-blue-500"
                actionCallback={confirmBookingCar}
              >
                Confirm
              </ActionButton>
              <DeleteActionButton deleteCallback={removingPreCar} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
