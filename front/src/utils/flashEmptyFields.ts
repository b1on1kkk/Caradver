import { ProfileValidityAction } from "../components/Profile/utils/settingsValidityReducer";

export function FlashEmptyFields(
  setProfileValidity: React.Dispatch<ProfileValidityAction>,
  values: string[],
  keys: string[]
) {
  let flag = false;

  for (let i = 0; i < keys.length; i++) {
    if (values[i] === "") flag = true;

    setProfileValidity({
      payload: {
        text: values[i],
        key: keys[i]
      }
    });
  }

  return flag;
}
