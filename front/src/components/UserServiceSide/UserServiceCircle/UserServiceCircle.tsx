import ServiceTitle from "../../../util_components/ServiceTitle";

import { TUserTodo } from "../../../store/middleware_interfaces/middleware_interfaces";

import { getRandomInt } from "../../../utils/random";

export default function UserServiceCircle({
  toDoData
}: {
  toDoData: TUserTodo[];
}) {
  return (
    <div className="px-9 py-8 flex gap-6 flex-col bg-white items-center rounded-lg justify-center">
      <ServiceTitle text="Your Order" />
      <div className="h-150 w-150 border-2 rounded-full flex items-center justify-center">
        <div className="p-7 h-95 w-95 flex justify-center items-center bg-gray-100 rounded-full text-sm flex-col">
          <span className="text-center font-bold text-gray-500">
            Service
            <br />
            Time
          </span>
          <div className="text-2xl text-blue-600 flex">
            {toDoData.length}:{toDoData.length > 0 ? getRandomInt(1, 4) : 0}h
          </div>
        </div>
      </div>
    </div>
  );
}
