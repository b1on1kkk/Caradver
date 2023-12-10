import styles from "./Header.module.scss";

import { useState, useEffect } from "react";

// components
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import Input from "../../util_components/Input";
import { Bell, Heart, Frown } from "lucide-react";
import WavyUnderlineText from "../../util_components/WavyUnderlineText";
import ModalMiniCarCard from "../ModalMiniCarCard/ModalMiniCarCard";
//

// router
import { NavLink, Link } from "react-router-dom";
//

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getUser } from "../../store/features/getUser.slice";
import { removePreCar, refrash } from "../../store/features/preBook.slice";
import { changeStatus } from "../../store/features/getCars.slice";
import { getAllBookedCars } from "../../store/features/getAllBookedCars.slice";
//

// utils
import { ConfirmBookingCar } from "./utils/confirmBookingCar";
import { UnbookedCar } from "./utils/unbookedCar";
import { CheckBookedCarExist } from "./utils/CheckBookedCarExist";
//

export default function Header() {
  const [searchText, setSearchText] = useState<string>("");
  const [openBell, setOpenBell] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.getUser.user);
  const error = useSelector((state: RootState) => state.getUser.error);

  const preBookCars = useSelector((state: RootState) => state.preBookCar);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (user.length > 0) dispatch(refrash());
  }, [user]);

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.left_header_block}>
          <div className={styles.logo_wrapper}>
            <HeaderLogo />
          </div>
          <h1 className="font-bold text-2xl">caradver</h1>
        </div>
      </Link>
      <div className="flex-1">
        <Input
          wrapper_styles={styles.center_header_block}
          icon_name="Search"
          input_styles={styles.input_styles}
          placeholder_text="Search or type"
          input_type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>
      <div>
        <div className="flex items-center gap-10 relative">
          <div>
            <Bell
              className="opacity-50 w-5"
              onClick={() => setOpenBell(!openBell)}
            />
          </div>

          {openBell && (
            <div className="absolute p-3 top-[60px] w-350 right-[50px] bg-white z-10 shadow-md rounded-lg flex flex-col gap-3">
              {user.length > 0 ? (
                <>
                  {preBookCars.length > 0 ? (
                    <>
                      {preBookCars.map((item, idx) => {
                        return (
                          <ModalMiniCarCard
                            car={item}
                            booked_car_exist={CheckBookedCarExist(preBookCars)}
                            removingPreCar={() => {
                              dispatch(
                                changeStatus({
                                  id: item.id,
                                  status: "none"
                                })
                              );
                              dispatch(removePreCar(item.id));
                            }}
                            confirmBookingCar={async () => {
                              if (await ConfirmBookingCar(user, item)) {
                                dispatch(
                                  changeStatus({
                                    id: item.id,
                                    status: "booked"
                                  })
                                );
                                dispatch(refrash());
                                dispatch(getAllBookedCars());
                              }
                            }}
                            unbookCar={async () => {
                              if (await UnbookedCar(user[0].id)) {
                                dispatch(
                                  changeStatus({
                                    id: item.id,
                                    status: "prebooked"
                                  })
                                );
                                dispatch(refrash());
                                dispatch(getAllBookedCars());
                              }
                            }}
                            key={idx}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <span>There is nothing to confirm yet</span>{" "}
                      <Frown className="w-5" fill="lightgreen" />
                    </div>
                  )}
                </>
              ) : (
                <div className="p-2 flex gap-2">
                  <span>
                    {" "}
                    To book cars{" "}
                    <WavyUnderlineText link="/sign_up" text="Sign up" /> or{" "}
                    <WavyUnderlineText link="/registration" text="Log in" />
                  </span>

                  <Heart className="w-5" fill="red" />
                </div>
              )}
            </div>
          )}

          {error === null && user.length > 0 ? (
            <div className="flex">
              <img
                src={user[0].photo_link}
                alt="person_picture"
                className="object-cover w-12 h-12 rounded-full "
              />
            </div>
          ) : (
            <div className="flex">
              <NavLink to="/registration">
                <div className="px-5 py-2 border-1 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 ease-out hover:border-blue-500">
                  Log in
                </div>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
