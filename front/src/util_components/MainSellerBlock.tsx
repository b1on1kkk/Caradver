import { icons } from "lucide-react";

import { Link } from "react-router-dom";

interface TMainSellerBlock {
  first_title: string;
  second_title: string;
  link_text: string;
  icon_names: string[];
  id: string;
  to: string;
}

export default function MainSellerBlock({
  first_title,
  second_title,
  link_text,
  icon_names,
  id,
  to
}: TMainSellerBlock) {
  const [First_icon, Second_icon, Third_icon] = [
    icons[icon_names[0] as keyof typeof icons],
    icons[icon_names[1] as keyof typeof icons],
    icons[icon_names[2] as keyof typeof icons]
  ];

  return (
    <main className="pl-2 flex flex-col gap-2 flex-1">
      <div className="flex gap-12">
        <First_icon className="w-5 opacity-50" />
        <span className="flex-1 font-medium">{first_title}</span>
      </div>
      <div className="flex gap-12">
        <Second_icon className="w-5 opacity-50" />
        <span className="flex-1 font-medium">{second_title}</span>
        <Link to={`/Assets/${id}/${to}`}>
          <span className="text-xs text-gray-400 font-bold flex items-center justify-center gap-2">
            {link_text}
            <Third_icon className="w-4" />
          </span>
        </Link>
      </div>
    </main>
  );
}
