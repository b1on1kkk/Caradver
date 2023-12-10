import { icons } from "lucide-react";

interface TRightSide {
  price: string;
  text: string;
  icon_name: string;
  color: string;
  text_color: string;
  bg_color: string;
}

export default function RightSide({
  price,
  text,
  icon_name,
  color,
  text_color,
  bg_color
}: TRightSide) {
  const LucideIcon = icons[icon_name as keyof typeof icons];

  return (
    <div>
      <div
        className={`p-3 ${bg_color} rounded-lg inline-flex justify-center mb-1`}
      >
        <LucideIcon color={`${color}`} />
      </div>
      <div className={`text-xl font-bold ${text_color} mb-1 `}>{price}</div>
      <div className="text-sm text-gray-500 font-medium">{text}</div>
    </div>
  );
}
