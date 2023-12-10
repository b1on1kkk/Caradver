import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getCars } from "../../store/features/getCars.slice";
import { getAllBookedCars } from "../../store/features/getAllBookedCars.slice";
//

// components
import CarCard from "../CarCard/CarCard";
import DashboardSkeletonLoader from "../DashboardSkeletonLoader/DashboardSkeletonLoader";
import ErrorPage from "../ErrorPage/ErrorPage";
import DropDownCarFilter from "./DropDownCarFilter/DropDownCarFilter";
//

// utils
import { ExistanceInBookedCarArray } from "./utils/ExistanceInBookedCarArray";
//

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.getCars.cars);
  const loading = useSelector((state: RootState) => state.getCars.loading);
  const error = useSelector((state: RootState) => state.getCars.error);
  const bookedCars = useSelector(
    (state: RootState) => state.allBookedCars.data
  );

  useEffect(() => {
    dispatch(getCars(""));
    dispatch(getAllBookedCars());
  }, []);

  return (
    <main className="p-11 h-full flex flex-col gap-8">
      {error ? (
        <ErrorPage
          title_text="500 ERROR PAGE"
          error_text="It looks like server sent you to a void, sorry :("
        />
      ) : (
        <>
          <DropDownCarFilter
            getFilteredCarsHandler={(brand) =>
              dispatch(getCars(`brand=${brand}`))
            }
          />

          <div className="flex flex-wrap gap-7 justify-center">
            {loading === "loaded" ? (
              <>
                {cars.map((car, idx) => {
                  if (ExistanceInBookedCarArray(bookedCars, car.id)) {
                    return (
                      <CarCard
                        car={{ ...car, book_status: "booked" }}
                        key={idx}
                      />
                    );
                  }
                  return <CarCard car={car} key={idx} />;
                })}
              </>
            ) : (
              <DashboardSkeletonLoader />
            )}
          </div>
        </>
      )}
    </main>
  );
}
