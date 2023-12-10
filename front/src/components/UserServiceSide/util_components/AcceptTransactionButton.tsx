import { PackageCheck } from "lucide-react";

interface TAcceptTransactionButton {
  button_text: string;
  accept_status: boolean;
  button_color: string;
  bookServiceCallback: () => void;
}

export default function AcceptTransactionButton({
  button_text,
  accept_status,
  button_color,
  bookServiceCallback
}: TAcceptTransactionButton) {
  return (
    <div
      className={`py-4 text-center ${button_color}-500 rounded-lg hover:${button_color}-600 transition-all duration-200 ease-in select-none`}
      onClick={bookServiceCallback}
    >
      <div className="flex items-center gap-3 justify-center">
        {accept_status && (
          <div>
            <PackageCheck color="white" />
          </div>
        )}
        <div className="text-2xl text-white font-semibold">{button_text}</div>
      </div>
    </div>
  );
}
