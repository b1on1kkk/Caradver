import { icons } from "lucide-react";

interface TDetailedCarInf {
  text: string;
  icon_name: string;
}

export default function DetailedCarInf({ text, icon_name }: TDetailedCarInf) {
  const Icon = icons[icon_name as keyof typeof icons];

  return (
    <div className="flex gap-4">
      <Icon className="w-5 opacity-50" />
      <span className="font-semibold">{text}</span>
    </div>
  );
}
