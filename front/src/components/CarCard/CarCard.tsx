import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addPreCar, removePreCar } from "../../store/features/preBook.slice";
import { changeStatus } from "../../store/features/getCars.slice";
//

// utils
import { getRandomInt } from "../../utils/random";
//

import { RotateCcw, ArrowUpNarrowWide, Sparkles, Bookmark } from "lucide-react";

import type { Car } from "../../store/middleware_interfaces/middleware_interfaces";

export default function CarCard({ car }: { car: Car }) {
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector((state: RootState) => state.getUser.error);

  function BookedColorChecking() {
    if (car.book_status === "booked") return "fill-purple-700";
    else if (car.book_status === "prebooked") return "fill-red-600";
    else return "fill-white";
  }

  return (
    <div className="inline-flex flex-col p-5 bg-white rounded-lg gap-3 shadow-lg hover:shadow-2xl transition-all duration-200 ease-in hover:-translate-y-1">
      <Link to={`/Assets/${car.id}`}>
        <header className="flex gap-3 mb-3">
          <RotateCcw className="w-5 opacity-50" />
          <span className="text-base font-bold">
            {getRandomInt(5, 100)}% Recommend
          </span>
        </header>
        <main className="flex h-200">
          <img
            src={JSON.parse(car.pictures)[0]}
            alt={car.brand}
            className="w-60 h-auto object-cover rounded-lg"
          />
        </main>
      </Link>
      <footer className="flex flex-col gap-2">
        <div className="text-xl font-bold">
          {car.brand} {car.make}
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <ArrowUpNarrowWide className="w-4 opacity-50" />
            <span className="text-sm text-gray-500 font-semibold">
              {car.mileage}
            </span>
          </div>
          <div>
            <Sparkles className="w-4 opacity-50" />
          </div>
          <div className="flex-1">
            <Bookmark
              className={`w-4 opacity-50  hover:fill-red-600 ${BookedColorChecking()}`}
              onClick={() => {
                if (!error) {
                  if (car.book_status === "none") {
                    dispatch(changeStatus({ id: car.id, status: "prebooked" }));
                    dispatch(addPreCar(car));
                  } else {
                    if (car.book_status !== "booked") {
                      dispatch(changeStatus({ id: car.id, status: "none" }));
                      dispatch(removePreCar(car.id));
                    }
                  }
                }
              }}
            />
          </div>
          <div>
            <span className="text-sm text-gray-500 font-semibold">
              ${car.price_per_hour}/h
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
