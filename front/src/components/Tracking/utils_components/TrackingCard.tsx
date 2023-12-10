import styles from "../Tracking.module.scss";

// components
import MoreCarInf from "./MoreCarInf";
import RightSide from "./RightSide";
//

// utils
import { getRandomInt } from "../../../utils/random";
import { ArrowRight } from "lucide-react";
//

// redux
import { TBookedCarInf } from "../../../store/features/getAllBookedCars.slice";
//

interface TTrackingCardInterface {
  item: TBookedCarInf;
  changingStatus: () => void;
}

export default function TrackingCard({
  item,
  changingStatus
}: TTrackingCardInterface) {
  return (
    <div className="flex flex-col gap-8">
      <div className="px-8 py-6 flex bg-white rounded-lg gap-24 items-center">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-1">
            <div className="text-xl font-bold">
              {item.name}
              <br />
              {item.surname}
            </div>
            <div>
              <span className="text-sm text-gray-400 font-medium">
                avarage price:{" "}
              </span>
              <span className="text-red-500 text-lg font-semibold">
                ${item.price}
              </span>
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {item.brand} {item.make}
            </div>
          </div>

          <div className="flex mt-2">
            <div
              className="inline-flex bg-red-500 px-5 rounded-xl hover:bg-red-600 transition-all duration-200 ease-in"
              onClick={changingStatus}
            >
              <ArrowRight color="white" className="w-5" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className={styles.donut}>45%</div>
          <div className="text-center text-sm font-semibold text-green-500">
            Excellent
          </div>
          <div className="text-lg text-gray-500 font-semibold">
            Impression Share
          </div>
        </div>

        <div className="flex">
          <div className="w-110 h-110 border-4 rounded-full flex items-center justify-center border-blue-500">
            <div className="w-92 h-92 border-4 rounded-full flex items-center justify-center border-red-400">
              <div className="w-74 h-74 border-4 rounded-full text-xl font-bold flex items-center justify-center border-yellow-500">
                ${getRandomInt(100, 1000)}
              </div>
            </div>
          </div>
        </div>

        <RightSide
          price={item.mileage}
          text="Mileage"
          icon_name="MapPinned"
          color="#2563eb"
          text_color="text-blue-600"
          bg_color="bg-blue-100"
        />
        <RightSide
          price={item.power}
          text="Power"
          icon_name="Zap"
          color="#f87171"
          text_color="text-red-400"
          bg_color="bg-red-100"
        />
        <RightSide
          price={item.fuel}
          text="Type of fuel"
          icon_name="Fuel"
          color="#2563eb"
          text_color="text-blue-600"
          bg_color="bg-blue-100"
        />
      </div>
      {item.status && <MoreCarInf item={item} />}
    </div>
  );
}
