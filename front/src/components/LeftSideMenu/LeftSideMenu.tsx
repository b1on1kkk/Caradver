import styles from "./LeftSideMenu.module.scss";

import { LEFTSIDE_MENU, LEFTSIDE_FOOTER } from "../../constants";

import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

import { clearPreCarStorage } from "../../store/features/preBook.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

export default function LeftSideMenu() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  return (
    <aside className={styles.aside}>
      <div className={styles.aside_wrapper}>
        <main className={styles.main}>
          {LEFTSIDE_MENU.map((elem, idx) => {
            return (
              <NavLink
                to={
                  elem.field_name === "Dashboard" ? "/" : `/${elem.field_name}`
                }
                key={idx}
                className={({ isActive }) =>
                  isActive ? `${styles.active_link}` : ""
                }
              >
                <div className={styles.menu_tile}>
                  <div>{elem.tag_name}</div>
                  <span className="opacity-80 font-medium">
                    {elem.field_name}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </main>

        <footer className={styles.footer}>
          <NavLink
            to={`/${LEFTSIDE_FOOTER[0].link}`}
            className={({ isActive }) =>
              isActive ? `${styles.active_link}` : ""
            }
          >
            <div className={styles.menu_tile}>
              <div>{LEFTSIDE_FOOTER[0].tag_name}</div>
              <span className="opacity-80 font-medium">
                {LEFTSIDE_FOOTER[0].field_name}
              </span>
            </div>
          </NavLink>

          <div
            className={styles.menu_tile}
            onClick={() => {
              const getData = localStorage.getItem("preBooked");
              dispatch(clearPreCarStorage(""));

              axios.post("http://localhost:2000/remove_cookie", {
                data: getData
              });

              navigate("/registration");
            }}
          >
            <div>{LEFTSIDE_FOOTER[1].tag_name}</div>
            <span className="opacity-80 font-medium">
              {LEFTSIDE_FOOTER[1].field_name}
            </span>
          </div>
        </footer>
      </div>
    </aside>
  );
}
