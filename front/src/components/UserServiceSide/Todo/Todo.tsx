import ServiceInnerBlockTitle from "../../../util_components/ServiceInnerBlockTitle";
import { Trash } from "lucide-react";

interface TodoInterface {
  dot_color: string;
  service_text: string;
  price: number;
  user_status: boolean;

  remove_todo_function: () => void;
}

export default function Todo({
  dot_color,
  service_text,
  price,
  user_status,
  remove_todo_function
}: TodoInterface) {
  return (
    <div className="p-4 flex items-center mb-3 bg-white rounded-lg">
      <div
        className="w-3 h-3 rounded-full mr-4"
        style={{ backgroundColor: dot_color }}
      />
      <span className="flex-1 mr-14">
        <ServiceInnerBlockTitle text={service_text} />
      </span>
      <div className="flex items-center gap-2">
        <div className="px-4 py-0.5 text-xl bg-blue-50 rounded-lg text-blue-500 font-bold">
          ${price}
        </div>
        {user_status && (
          <div
            className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in"
            onClick={remove_todo_function}
          >
            <Trash className="w-5 opacity-50" />
          </div>
        )}
      </div>
    </div>
  );
}
