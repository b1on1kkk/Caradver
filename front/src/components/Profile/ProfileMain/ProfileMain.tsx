import styles from "../Profile.module.scss";

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

import LoggingInput from "../../../util_components/LoggingInput";

interface TProfileMain {
  setProfile: React.Dispatch<ProfileAction>;
  profile: ProfileState;
  setProfileValidity: React.Dispatch<ProfileValidityAction>;
  profileValidity: ProfileValidityState;
}

export default function ProfileMain({
  setProfile,
  profile,
  setProfileValidity,
  profileValidity
}: TProfileMain) {
  return (
    <main className={styles.main}>
      <div className="flex gap-9">
        <div className={styles.two_inputs}>
          <LoggingInput
            title="Live in"
            onChange={(e) =>
              setProfile({
                type: ProfileSettings.LIVE_IN,
                payload: e.target.value
              })
            }
            text_value={profile.city}
            placeholder={"Live in"}
            type={"text"}
            icon="Home"
            error_status={profileValidity.city}
            error_text="Field should not be empty!"
            onBlur={(e) => {
              setProfileValidity({
                payload: {
                  text: e.target.value,
                  key: "city"
                }
              });
            }}
          />
        </div>
        <div className={styles.two_inputs}>
          <LoggingInput
            title="Street Address"
            onChange={(e) =>
              setProfile({
                type: ProfileSettings.STREET_ADDRESS,
                payload: e.target.value
              })
            }
            text_value={profile.address}
            placeholder={"Street Address"}
            type={"text"}
            icon="Home"
            error_status={profileValidity.address}
            error_text="Field should not be empty!"
            onBlur={(e) => {
              setProfileValidity({
                payload: {
                  text: e.target.value,
                  key: "address"
                }
              });
            }}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <LoggingInput
            title="Email Address"
            onChange={(e) =>
              setProfile({
                type: ProfileSettings.EMAIL_ADDRESS,
                payload: e.target.value
              })
            }
            text_value={profile.email}
            placeholder={"Email Address"}
            type={"text"}
            icon="Mail"
            error_status={profileValidity.email}
            error_text="Field should not be empty!"
            onBlur={(e) => {
              setProfileValidity({
                payload: {
                  text: e.target.value,
                  key: "email"
                }
              });
            }}
          />
        </div>
      </div>
      {/*  */}
      <div className="flex gap-9">
        <div className={styles.two_inputs}>
          <LoggingInput
            title="Date Of Birth"
            onChange={(e) =>
              setProfile({
                type: ProfileSettings.DATE_OF_BIRTH,
                payload: e.target.value
              })
            }
            text_value={profile.birthday}
            placeholder={"Email Address"}
            type={"date"}
            icon="Cake"
            error_status={profileValidity.birthday}
            error_text="Field should not be empty!"
            onBlur={(e) => {
              setProfileValidity({
                payload: {
                  text: e.target.value,
                  key: "birthday"
                }
              });
            }}
          />
        </div>
        <div className={styles.two_inputs}>
          <LoggingInput
            title="Gender"
            onChange={(e) =>
              setProfile({
                type: ProfileSettings.GENDER,
                payload: e.target.value
              })
            }
            text_value={profile.gender}
            placeholder={"Gender"}
            type={"text"}
            icon="FileBadge"
            error_status={profileValidity.gender}
            error_text="Field should not be empty!"
            onBlur={(e) => {
              setProfileValidity({
                payload: {
                  text: e.target.value,
                  key: "gender"
                }
              });
            }}
          />
        </div>
      </div>
    </main>
  );
}
