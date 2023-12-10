import axios from "axios";

import type { Car } from "../../../store/middleware_interfaces/middleware_interfaces";

interface TUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  city: string;
  address: string;
  birthday: string;
  gender: string;
  photo_link: string;
  facebook_link: string;
  twitter_link: string;
  unique_key: string;
  role: number;
}

export async function ConfirmBookingCar(user: TUser[], car: Car) {
  try {
    await axios.post("http://localhost:2000/confirm_booking", {
      id: user[0].id,
      name: user[0].name,
      surname: user[0].surname,
      price: car.price,
      brand: car.brand,
      make: car.make,
      power: car.power,
      mileage: car.mileage,
      fuel: car.fuel,
      pictures: car.pictures,
      car_list_id: car.id
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
