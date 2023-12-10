import { useReducer, useEffect } from "react";

// components
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileMain from "./ProfileMain/ProfileMain";
import ProfileFooter from "./ProfileFooter/ProfileFooter";
import UserNotLogged from "./UserNotLogged/UserNotLogged";
//

// redux
import { ProfileReducer } from "./utils/settingsReducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getUser } from "../../store/features/getUser.slice";
//

// utils
import { ProfileValidityReducer } from "./utils/settingsValidityReducer";
//

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.getUser.user);
  const error = useSelector((state: RootState) => state.getUser.error);

  const [profile, setProfile] = useReducer(ProfileReducer, {
    city: user.length > 0 ? user[0].city : "",
    address: user.length > 0 ? user[0].address : "",
    email: user.length > 0 ? user[0].email : "",
    birthday: user.length > 0 ? user[0].birthday : "",
    gender: user.length > 0 ? user[0].gender : "",
    facebook_link: user.length > 0 ? user[0].facebook_link : "",
    twitter_link: user.length > 0 ? user[0].twitter_link : "",
    photo_link: user.length > 0 ? user[0].photo_link : ""
  });

  const [profileValidity, setProfileValidity] = useReducer(
    ProfileValidityReducer,
    {
      city: false,
      address: false,
      email: false,
      birthday: false,
      gender: false,
      facebook_link: false,
      twitter_link: false
    }
  );

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      {!error ? (
        <>
          <ProfileHeader />

          <ProfileMain
            setProfile={setProfile}
            profile={profile}
            setProfileValidity={setProfileValidity}
            profileValidity={profileValidity}
          />

          <ProfileFooter
            setProfile={setProfile}
            profile={profile}
            setProfileValidity={setProfileValidity}
            profileValidity={profileValidity}
          />
        </>
      ) : (
        <UserNotLogged />
      )}
    </>
  );
}
