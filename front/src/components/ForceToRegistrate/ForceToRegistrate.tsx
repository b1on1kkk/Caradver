import WavyUnderlineText from "../../util_components/WavyUnderlineText";

import { Heart } from "lucide-react";

export default function ForceToRegistrate() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold">
          Sorry, but you have to{" "}
          <WavyUnderlineText link="/sign_up" text="Sign up" /> or{" "}
          <WavyUnderlineText link="/registration" text="Log in" />
        </span>
        <Heart className="w-6 flex" fill="red" />
      </div>
    </div>
  );
}
