import ServiceTitle from "../../../util_components/ServiceTitle";

import { NavLink } from "react-router-dom";

import { Chrome, Facebook } from "lucide-react";

interface THeader {
  title: string;
  link_text: string;
  link: string;
}

export default function Header({ title, link_text, link }: THeader) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <ServiceTitle text="Get’s started." />
        <div className="flex gap-1">
          <span>{title}</span>
          <span>
            <NavLink to={`/${link}`} className="text-blue-500 font-medium">
              {link_text}
            </NavLink>
          </span>
        </div>
      </div>

      <div className="flex gap-4 mt-14">
        <div className="px-8 py-4 bg-white rounded-lg flex gap-3 hover:bg-gray-200 transition-all duration-200 ease-in select-none cursor-pointer">
          <div className="flex items-center">
            <Chrome width={20} height={20} className="opacity-70" />
          </div>
          <span>Sign in with Google</span>
        </div>
        <div className="px-8 py-4 bg-blue-500 rounded-lg text-white flex gap-3 hover:bg-blue-600 transition-all duration-200 ease-in select-none cursor-pointer">
          <div className="flex items-center">
            <Facebook width={20} height={20} className="opacity-70" />
          </div>
          <span>Sign in with Facebook</span>
        </div>
      </div>
    </>
  );
}
