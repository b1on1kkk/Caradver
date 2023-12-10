import { useState } from "react";

import { ChevronDown } from "lucide-react";

// constants
import { TO_FILTER_BRANDS } from "../../../constants";
//

// utils
import { PushingQueryState } from "../utils/PushingQueryState";
//

interface TDropDownCarFilter {
  getFilteredCarsHandler: (brand: string) => void;
}

const queryParameters = new URLSearchParams();

export default function DropDownCarFilter({
  getFilteredCarsHandler
}: TDropDownCarFilter) {
  const [openFilterMenu, setFilterMenu] = useState<boolean>(false);

  return (
    <div className="flex justify-end relative">
      <div
        className="px-5 py-2 flex gap-6 bg-white rounded-lg drop-shadow-sm transition-all duration-200 ease-in select-none"
        onClick={() => setFilterMenu(!openFilterMenu)}
      >
        <span className="text-base text-blue-500 font-semibold">Filter</span>{" "}
        <ChevronDown
          className={`w-4 opacity-50 ${
            openFilterMenu && "rotate-180"
          } duration-200`}
        />
      </div>

      {openFilterMenu && TO_FILTER_BRANDS && (
        <div className="absolute p-5 bg-white rounded-lg top-[45px] drop-shadow-sm z-20">
          <div className="flex flex-col gap-1">
            {TO_FILTER_BRANDS.map((brand, idx) => {
              return (
                <span
                  key={idx}
                  className="text-base text-blue-500 font-semibold px-2 py-1 hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in select-none"
                  onClick={() => {
                    queryParameters.append("brand", brand);
                    PushingQueryState(queryParameters);
                    getFilteredCarsHandler(brand);
                  }}
                >
                  {brand}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
