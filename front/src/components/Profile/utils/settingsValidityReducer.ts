export interface ProfileValidityState {
  city: boolean;
  address: boolean;
  email: boolean;
  birthday: boolean;
  gender: boolean;
  facebook_link: boolean;
  twitter_link: boolean;
}

export interface ProfileValidityAction {
  payload: {
    text: string;
    key: string;
  };
}

export function ProfileValidityReducer(
  state: ProfileValidityState,
  action: ProfileValidityAction
) {
  const { payload } = action;

  return {
    ...state,
    [payload.key]: payload.text.length > 0 ? false : true
  };
}
