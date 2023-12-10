import axios, { AxiosError } from "axios";

import { useState } from "react";

// components
import SubTitle from "../../../util_components/SubTitle";
import LoggingInput from "../../../util_components/LoggingInput";
import ErrorText from "../../../util_components/ErrorText";
import PersonAvatarHandler from "../PersonAvatarHandler/PersonAvatarHandler";
import SuccessText from "../../../util_components/SuccessText";
//

// reducers
import {
  ProfileAction,
  ProfileState,
  ProfileSettings
} from "../utils/settingsReducer";

import {
  ProfileValidityAction,
  ProfileValidityState
} from "../utils/settingsValidityReducer";
//

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { getUser } from "../../../store/features/getUser.slice";
//

// utils
import { FlashEmptyFields } from "../../../utils/flashEmptyFields";
import InputFileOnChange from "../utils/InputFileOnChange";
import { CheckCircle } from "lucide-react";
//

interface TProfileFootern {
  setProfile: React.Dispatch<ProfileAction>;
  profile: ProfileState;
  setProfileValidity: React.Dispatch<ProfileValidityAction>;
  profileValidity: ProfileValidityState;
}

export default function ProfileFooter({
  setProfile,
  profile,
  setProfileValidity,
  profileValidity
}: TProfileFootern) {
  const [avatar, setAvatar] = useState<{
    file: File | null;
    unique_name: string;
  } | null>(null);
  const [errorText, setErrorText] = useState<string>("");
  const [successText, setSuccessText] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  async function UpdateRequest() {
    if (
      !FlashEmptyFields(
        setProfileValidity,
        Object.values(profile),
        Object.keys(profile)
      )
    ) {
      try {
        if (avatar?.file) {
          const form = new FormData();
          form.append("avatar", avatar.file);

          await axios.post("http://localhost:2000/files_upload", form);
        }

        await axios.post("http://localhost:2000/update_profile", {
          ...profile,
          photo_link: avatar?.file
            ? `http://localhost:2000/photos?picture=${avatar?.unique_name}`
            : profile.photo_link
        });

        dispatch(getUser());

        setSuccessText(true);

        setTimeout(() => {
          setSuccessText(false);
        }, 5000);
      } catch (error) {
        if (error instanceof AxiosError) {
          const error_text = error.response?.data as string;

          if (error_text.indexOf("pre") !== -1)
            setErrorText("Extension of your file is not suitable or its size!");
          else setErrorText(error_text);

          setTimeout(() => {
            setErrorText("");
          }, 3000);
        }
      }
    }
  }

  return (
    <footer className="pt-6">
      <PersonAvatarHandler
        photo_link={profile.photo_link}
        settingAvatarHandler={() => setAvatar({ file: null, unique_name: "" })}
        inputFileHandler={(e) => InputFileOnChange(e, setAvatar)}
      />

      <div className="flex pt-6 items-center">
        <div className="flex flex-col gap-1 flex-1">
          <SubTitle
            title_text="Social Profiles"
            sub_text="This will be displayed on your social profiles"
            title_styles="text-base font-semibold"
          />
        </div>

        <div className="flex flex-col gap-4">
          <LoggingInput
            title="Facebook"
            onChange={(e) =>
              setProfile({
                type: ProfileSettings.FACEBOOK_LINK,
                payload: e.target.value
              })
            }
            text_value={profile.facebook_link}
            placeholder={"facebook.com/"}
            type={"text"}
            icon="Facebook"
            error_status={profileValidity.facebook_link}
            error_text="Field should not be empty!"
            onBlur={(e) => {
              setProfileValidity({
                payload: {
                  text: e.target.value,
                  key: "facebook_link"
                }
              });
            }}
          />

          <LoggingInput
            title="Twitter"
            onChange={(e) =>
              setProfile({
                type: ProfileSettings.TWITTER_LINK,
                payload: e.target.value
              })
            }
            text_value={profile.twitter_link}
            placeholder={"twitter.com/"}
            type={"text"}
            icon="Twitter"
            error_status={profileValidity.twitter_link}
            error_text="Field should not be empty!"
            onBlur={(e) => {
              setProfileValidity({
                payload: {
                  text: e.target.value,
                  key: "twitter_link"
                }
              });
            }}
          />
        </div>
      </div>

      {!errorText && !successText && (
        <div className="flex justify-end pt-6">
          <div
            className="inline-block px-6 p-2 border-1 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in select-none"
            onClick={UpdateRequest}
          >
            Save Changes
          </div>
        </div>
      )}

      {errorText && (
        <div className="flex justify-end pt-6">
          <ErrorText error_text={errorText} />
        </div>
      )}

      {successText && (
        <div className="flex justify-end pt-6">
          <div className="flex p-3 gap-3 items-center">
            <CheckCircle color="#40a45a" />
            <SuccessText success_text={"Successfully changed!"} />
          </div>
        </div>
      )}
    </footer>
  );
}
