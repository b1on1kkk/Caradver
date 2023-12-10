import { Trash } from "lucide-react";

export default function DeleteActionButton({
  deleteCallback
}: {
  deleteCallback: () => void;
}) {
  return (
    <div
      className="py-1 px-2 flex hover:bg-blue-300 rounded-md transition-all duration-200 ease-in cursor-pointer"
      onClick={deleteCallback}
    >
      <Trash className="w-4 opacity-50" />
    </div>
  );
}
