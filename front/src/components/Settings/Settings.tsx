import styles from "./Settings.module.scss";

import { NavLink } from "react-router-dom";

import { SETTINGS_MENU } from "../../constants";

import BiggestH1 from "../../util_components/BiggestH1";

export default function Settings() {
  return (
    <>
      <BiggestH1 text="Settings" />
      <nav className="flex gap-12">
        {SETTINGS_MENU.map((elem, idx) => {
          return (
            <NavLink
              to={`/Settings/${elem}`}
              key={idx}
              className={({ isActive }) =>
                isActive
                  ? `${styles.tab_is_active}`
                  : `${styles.tab_is_not_active}`
              }
            >
              <div>{elem}</div>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
