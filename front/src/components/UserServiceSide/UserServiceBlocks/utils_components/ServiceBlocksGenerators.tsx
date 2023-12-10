import styles from "../../UserServiceSide.module.scss";

import { NavLink } from "react-router-dom";

import type { TUserProps } from "../../../../store/middleware_interfaces/middleware_interfaces";
import type { TBookedService } from "../../../../store/middleware_interfaces/middleware_interfaces";
import type { TSeriveProps } from "../../../../store/middleware_interfaces/middleware_interfaces";

interface TServiceBlocksGenerators {
  array: TSeriveProps[];
  booked_services: TBookedService[];
  user: TUserProps;
}

export default function ServiceBlocksGenerators({
  array,
  booked_services,
  user
}: TServiceBlocksGenerators) {
  return (
    <div className="flex gap-3">
      {array.map((e, idx) => {
        if (booked_services.find((item) => item.id === e.id)) {
          const booked = booked_services.find((item) => item.id === e.id);
          return (
            <NavLink
              to={`/Services/${booked?.id}`}
              key={idx}
              className={({ isActive }) =>
                // toooooo confusing... anyway, if user had booked service - bg color green.
                // if service was booked - bg color red
                user.id === booked?.user_id
                  ? isActive
                    ? styles.button_tile_booked_active
                    : styles.button_tile_booked
                  : isActive
                  ? styles.button_tile_danger_active
                  : styles.button_tile_danger
              }
            >
              <div>{e.id}</div>
            </NavLink>
          );
        }
        return (
          <NavLink
            to={`/Services/${e.id}`}
            key={idx}
            className={({ isActive }) =>
              isActive ? `${styles.button_tile_active}` : styles.button_tile
            }
          >
            <div>{e.id}</div>
          </NavLink>
        );
      })}
    </div>
  );
}
