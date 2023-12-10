import {
  LayoutDashboard,
  LifeBuoy,
  ScanEye,
  Hammer,
  Settings,
  LogOut
} from "lucide-react";

export const LEFTSIDE_MENU = [
  {
    tag_name: <LayoutDashboard className="w-5 opacity-50" />,
    field_name: "Dashboard"
  },
  {
    tag_name: <LifeBuoy className="w-5 opacity-50" />,
    field_name: "Assets"
  },
  {
    tag_name: <ScanEye className="w-5 opacity-50" />,
    field_name: "Tracking"
  },
  {
    tag_name: <Hammer className="w-5 opacity-50" />,
    field_name: "Services"
  }
];

export const LEFTSIDE_FOOTER = [
  {
    tag_name: <Settings className="w-5 opacity-50" />,
    link: "Settings",
    field_name: "Settings"
  },
  {
    tag_name: <LogOut className="w-5 opacity-50" />,
    link: "registration",
    field_name: "Log out"
  }
];

export const SETTINGS_MENU = [
  "My details",
  "Profile",
  "Password",
  "Email",
  "Notification"
];

export const DOT_TODO_COLORS = [
  "#a09db2",
  "#84809c",
  "#7f72a2",
  "#333333",
  "#313131",
  "#252525",
  "#6d979c",
  "#4e6c70",
  "#d3ffce",
  "#b0e0e6",
  "#008080",
  "#065535",
  "#ff80ed",
  "#198ba3",
  "#126577",
  "#a9e37c",
  "#ae0e52",
  "#011a04",
  "#ff4c78",
  "#4cd6f1",
  "#87b8ea",
  "#e3c6ff",
  "#2d2525",
  "#7bcf7d",
  "#a9e37c",
  "#b0e7ff",
  "#65e8b4",
  "#d0ae8b",
  "#00d5ff",
  "#038c93",
  "#5d548c",
  "#837fb3",
  "#282a36",
  "#65e8b4",
  "#d0ae8b",
  "#e3c6ff",
  "#87b8ea",
  "#ae0e52",
  "#c70d0f",
  "#7bd34e",
  "#e4181b",
  "#006ab5"
];

export const TO_FILTER_BRANDS = ["Porsche", "BMW", "McLaren"];

export const TRACKING_HISTORY_METRICS = [30, 25, 20, 15, 10, 5, 0];
