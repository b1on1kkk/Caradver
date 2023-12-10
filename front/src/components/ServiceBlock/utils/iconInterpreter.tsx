import {
  ParkingCircle,
  Cable,
  Boxes,
  LandPlot,
  Timer,
  User,
  Warehouse,
  Archive
} from "lucide-react";

export function IconInterpreter(icon_name: string) {
  switch (icon_name) {
    case "ParkingCircle":
      return <ParkingCircle className="opacity-40" />;
    case "Cable":
      return <Cable className="opacity-40" />;
    case "Boxes":
      return <Boxes className="opacity-40" />;
    case "LandPlot":
      return <LandPlot className="opacity-40" />;
    case "Timer":
      return <Timer className="opacity-40" />;
    case "User":
      return <User className="opacity-40" />;
    case "Warehouse":
      return <Warehouse className="opacity-40" />;
    case "Archive":
      return <Archive className="opacity-40" />;
    default:
      return <></>;
  }
}
