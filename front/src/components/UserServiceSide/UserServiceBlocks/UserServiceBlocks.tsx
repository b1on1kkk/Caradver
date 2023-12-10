import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAllServices } from "../../../store/features/getAllServicesData.slice";
//

// components
import ServiceBlocksGenerators from "./utils_components/ServiceBlocksGenerators";
import ServiceTitle from "../../../util_components/ServiceTitle";
//

export default function UserServiceBlocks() {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector((state: RootState) => state.getAllServices.data);
  const user = useSelector((state: RootState) => state.getUser.user);
  const bookedServices = useSelector(
    (state: RootState) => state.BookedServices.booked_serives
  );

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <ServiceTitle text="Service Station" />

      {services.length && (
        <div className="flex flex-col gap-4">
          <ServiceBlocksGenerators
            array={services[0]}
            booked_services={bookedServices}
            user={user[0]}
          />
          <ServiceBlocksGenerators
            array={services[1]}
            booked_services={bookedServices}
            user={user[0]}
          />
        </div>
      )}

      <div className="flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 border-2 rounded-full"></div>
          <div>Ready</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div>Booked</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div>Current Station</div>
        </div>
      </div>
    </div>
  );
}
