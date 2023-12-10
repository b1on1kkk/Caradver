import ServiceInnerBlockTitle from "../../../util_components/ServiceInnerBlockTitle";

interface TNewTodoButton {
  new_todo_handler: () => void;
}

export default function NewTodoButton({ new_todo_handler }: TNewTodoButton) {
  return (
    <div
      className="p-4 bg-pink-100 rounded-lg border-dashed border-2 border-pink-200 text-center select-none hover:bg-pink-200 hover:border-pink-400 transition-all duration-200 ease-in"
      onClick={new_todo_handler}
    >
      <ServiceInnerBlockTitle text="Add Services" />
    </div>
  );
}
