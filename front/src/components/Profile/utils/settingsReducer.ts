export enum ProfileSettings {
  LIVE_IN = "LIVE_IN",
  STREET_ADDRESS = "STREET_ADDRESS",
  EMAIL_ADDRESS = "EMAIL_ADDRESS",
  DATE_OF_BIRTH = "DATE_OF_BIRTH",
  GENDER = "GENDER",
  FACEBOOK_LINK = "FACEBOOK_LINK",
  TWITTER_LINK = "TWITTER_LINK",
  USER_AVATAR = "USER_AVATAR"
}

export interface ProfileAction {
  type: ProfileSettings;
  payload: string;
}

export interface ProfileState {
  city: string;
  address: string;
  email: string;
  birthday: string;
  gender: string;
  facebook_link: string;
  twitter_link: string;
  photo_link: string;
}

export function ProfileReducer(state: ProfileState, action: ProfileAction) {
  const { type, payload } = action;

  switch (type) {
    case ProfileSettings.LIVE_IN:
      return {
        ...state,
        city: payload
      };
    case ProfileSettings.STREET_ADDRESS:
      return {
        ...state,
        address: payload
      };
    case ProfileSettings.EMAIL_ADDRESS:
      return {
        ...state,
        email: payload
      };
    case ProfileSettings.DATE_OF_BIRTH:
      return {
        ...state,
        birthday: payload
      };
    case ProfileSettings.GENDER:
      return {
        ...state,
        gender: payload
      };
    case ProfileSettings.FACEBOOK_LINK:
      return {
        ...state,
        facebook_link: payload
      };
    case ProfileSettings.TWITTER_LINK:
      return {
        ...state,
        twitter_link: payload
      };
    case ProfileSettings.USER_AVATAR:
      return {
        ...state,
        photo_link: payload
      };
    default:
      return state;
  }
}
