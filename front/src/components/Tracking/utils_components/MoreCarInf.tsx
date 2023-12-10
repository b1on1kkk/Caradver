import styles from "../Tracking.module.scss";

import { TRACKING_HISTORY_METRICS } from "../../../constants";

import { TBookedCarInf } from "../../../store/features/getAllBookedCars.slice";

import { getRandomInt } from "../../../utils/random";

export default function MoreCarInf({ item }: { item: TBookedCarInf }) {
  return (
    <div className={styles.detailed_inf}>
      <div className="flex-1 bg-white rounded-lg relative min-h-400 px-11 py-8 flex flex-col gap-7">
        <h2 className="text-2xl font-bold">
          {item.brand} {item.make}
        </h2>
        <div className="flex justify-center">
          <img
            src={JSON.parse(item.pictures)[0]}
            alt="car_picture"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col px-6 py-7 bg-white rounded-lg gap-7">
        <h2 className="text-2xl font-bold">Tracking History</h2>
        <div className="flex gap-5">
          <div className="flex flex-col gap-7">
            {TRACKING_HISTORY_METRICS.map((item, idx) => {
              return <div key={idx}>{item}</div>;
            })}
          </div>
          <div className="flex-1 w-350 gap-11 flex flex-col relative">
            {TRACKING_HISTORY_METRICS.map((_, idx) => {
              return (
                <div
                  className="border-1 border-dashed w-full mt-2 z-10"
                  key={idx}
                ></div>
              );
            })}

            <div className="flex absolute gap-4 bottom-0 justify-start">
              {TRACKING_HISTORY_METRICS.map((_, idx) => {
                return (
                  <div className="flex items-end" key={idx}>
                    <div
                      className="w-6 bg-gray-100 rounded-t-lg flex hover:bg-red-500 hover:z-20 hover:transition-all hover:duration-300 ease-in"
                      style={{
                        height: `${getRandomInt(10, 300)}px`
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
