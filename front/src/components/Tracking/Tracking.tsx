import { useEffect } from "react";

import BiggestH1 from "../../util_components/BiggestH1";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

import { getAllBookedCars } from "../../store/features/getAllBookedCars.slice";

import { changeStatus } from "../../store/features/getAllBookedCars.slice";

import TrackingCard from "./utils_components/TrackingCard";

export default function Tracking() {
  const dispatch = useDispatch<AppDispatch>();

  const allBookedCars = useSelector(
    (state: RootState) => state.allBookedCars.data
  );

  useEffect(() => {
    dispatch(getAllBookedCars());
  }, []);

  return (
    <main className="p-8 flex flex-col gap-8 h-full w-full">
      {allBookedCars.length > 0 ? (
        <>
          <header>
            <BiggestH1 text="Booked Cars" />
          </header>

          <main className="flex flex-col gap-8">
            {allBookedCars.map((item, idx) => {
              return (
                <TrackingCard
                  item={item}
                  key={idx}
                  changingStatus={() =>
                    dispatch(
                      changeStatus({
                        id: item.id,
                        toChangeStatus: !item.status
                      })
                    )
                  }
                />
              );
            })}
          </main>
        </>
      ) : (
        <div className="text-lg flex h-full w-full justify-center items-center">
          Sorry, but clients do not book anything yet...
        </div>
      )}
    </main>
  );
}
