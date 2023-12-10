import { useEffect } from "react";

import ServiceTitle from "../../util_components/ServiceTitle";
import ServiceInnerBlockTitle from "../../util_components/ServiceInnerBlockTitle";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";

import { IconInterpreter } from "./utils/iconInterpreter";

interface TServiceRequiredData {
  color: { bg: string; icon_color: string };
  icon: string;
  price: number;
  processing: number;
  title: string;
}

interface TServiceScheduleData {
  title: string;
  date: string;
  price: number;
  status: number;
}

export default function ServiceBlock() {
  const service = useSelector(
    (state: RootState) => state.getService.static_service
  );
  const [data, setData] = useState<TServiceRequiredData[]>([]);

  useEffect(() => {
    if (service.length) setData(JSON.parse(service[0].required));
  }, [service]);

  return (
    <div className="flex flex-col gap-6 flex-1">
      <ServiceTitle text="Service Required" />

      <div className="flex bg-white rounded-lg p-6 gap-4 items-center">
        <div className="flex flex-col gap-3 justify-center">
          {data.length > 0 && (
            <>
              {data.map((item, idx) => {
                return (
                  <div className="flex flex-col gap-3" key={idx}>
                    <div
                      className={`p-4 rounded-full flex`}
                      style={{
                        backgroundColor: item.color.icon_color + "20"
                      }}
                    >
                      {IconInterpreter(item.icon)}
                    </div>
                    {idx !== data.length - 1 && (
                      <div className="p-3 relative">
                        <div
                          className="border-1 rotate-90"
                          style={{
                            borderColor: item.color.icon_color + "90"
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        <div className="flex flex-col gap-14 h-full">
          {data.length > 0 && (
            <>
              {data.map((item, idx) => {
                return (
                  <div className="flex flex-col" key={idx}>
                    <div className="text-xl font-bold text-gray-400">
                      <ServiceInnerBlockTitle text={item.title} />
                    </div>
                    <div className="flex gap-4">
                      <div className="font-bold">Price: ${item.price}</div>
                      <div className="border-1" />
                      <div className="font-bold text-gray-500">
                        Processing: {item.processing} hours
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6 pb-4">
        <ServiceTitle text="Service Schedule" />

        {service.length > 0 && (
          <>
            {JSON.parse(service[0].schedule).map(
              (item: TServiceScheduleData, idx: number) => {
                return (
                  <div className="flex gap-5" key={idx}>
                    <div className="w-6 h-6 border-2 rounded-full flex items-center justify-center">
                      {item.status === 1 && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="text-base font-medium">{item.title}</div>
                      <div className="flex gap-4">
                        <div className="text-gray-500 text-sm">
                          Today, {item.date}
                        </div>
                        <div className="border-1"></div>
                        <div className="text-gray-500 text-sm">
                          Fix Price : ${item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </>
        )}
      </div>
    </div>
  );
}
