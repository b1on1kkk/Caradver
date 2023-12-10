import { NavLink } from "react-router-dom";

interface TWavyUnderlineText {
  link: string;
  text: string;
}

export default function WavyUnderlineText({ link, text }: TWavyUnderlineText) {
  return (
    <NavLink to={link}>
      {" "}
      <span className="underline decoration-wavy decoration-blue-400 underline-offset-4 p-1 rounded-lg hover:bg-blue-400 transition-all duration-200 ease-in hover:text-white hover:no-underline select-none">
        {text}
      </span>
    </NavLink>
  );
}
