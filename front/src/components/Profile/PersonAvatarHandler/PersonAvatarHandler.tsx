import { useRef } from "react";

import SettingsTitle from "../../../util_components/SettingsTitle";
import SubTitle from "../../../util_components/SubTitle";

interface TPersonAvatarHandler {
  photo_link: string;
  settingAvatarHandler: () => void;
  inputFileHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonAvatarHandler({
  photo_link,
  settingAvatarHandler,
  inputFileHandler
}: TPersonAvatarHandler) {
  const inputAvatarRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex items-center gap-20 border-b-1 pb-6">
      <div className="flex flex-col gap-1">
        <SubTitle
          title_text="Your photo"
          sub_text="This will be displayed on your profile."
          title_styles="text-base font-semibold"
        />
      </div>

      <div className="flex-1">
        <img
          src={photo_link}
          alt="user_avatar"
          className="w-14 h-14 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-6 justify-end">
          <span className="hover:bg-gray-300 transition-all duration-200 p-1 rounded-lg select-none">
            <SettingsTitle
              text_color="text-gray-600"
              text="Delete"
              onClick={settingAvatarHandler}
            />
          </span>

          <span className="hover:bg-blue-200 transition-all duration-200 p-1 rounded-lg select-none">
            <SettingsTitle
              text_color="text-blue-600"
              text="Update"
              onClick={() => inputAvatarRef.current!.click()}
            />
          </span>
        </div>

        <div className="text-xs opacity-50">
          Only .png, .jpg format allowed and 2MB - max picture size!
        </div>

        <input
          type="file"
          ref={inputAvatarRef}
          style={{ display: "none" }}
          name="avatar"
          onChange={inputFileHandler}
        />
      </div>
    </div>
  );
}
