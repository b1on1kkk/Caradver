interface TActionButton {
  main_color: string;
  hover_color: string;
  actionCallback: () => void;
  children: string;
}

export default function ActionButton({
  main_color,
  hover_color,
  actionCallback,
  children
}: TActionButton) {
  return (
    <div
      className={`flex px-2 py-1 ${main_color} rounded-md text-white select-none cursor-pointer hover:${hover_color} transition-all duration-200 ease-in text-sm items-center`}
      onClick={actionCallback}
    >
      {children}
    </div>
  );
}
