interface TNewTodoHandleButton {
  text: string;
  background_color: string;
  handler: () => void;
}

export default function NewTodoHandleButton({
  text,
  background_color,
  handler
}: TNewTodoHandleButton) {
  return (
    <div
      className={`px-5 py-3 rounded-lg ${background_color} text-white opacity-80 select-none hover:opacity-100 transition-all duration-200 ease-in`}
      onClick={handler}
    >
      {text}
    </div>
  );
}
