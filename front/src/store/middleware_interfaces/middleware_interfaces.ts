export interface TUserTodo {
  id: string;
  text: string;
  dot_color: string;
  price: number;
}

export interface TBookedCarInf {
  id: number;
  name: string;
  surname: string;
  price: number;
  brand: string;
  make: string;
  power: string;
  mileage: string;
  fuel: string;
  pictures: string;
  car_list_id: number;
  status: boolean;
}

export interface TBookedService {
  id: string;
  user_id: number;
  status: number;
  todos: string;
  required: string;
  schedule: string;
}

export interface TSeriveProps {
  id: string;
  required: string;
  schedule: string;
  status: number;
  todos: string;
}

export interface BookedCar {
  id: number;
  name: string;
  surname: string;
  price: number;
  brand: string;
  make: string;
  power: string;
  mileage: string;
  fuel: string;
  pictures: string;
  car_list_id: number;
}

export interface Car {
  id: number;
  price: number;
  brand: string;
  make: string;
  mileage: string;
  price_per_hour: number;
  registration: string;
  power: string;
  gear: string;
  fuel: string;
  drive: string;
  pictures: string;
  book_status: string;
}

export interface TUserProps {
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
  localstorage: string;
}

export interface TStaticService {
  id: string;
  required: string;
  schedule: string;
}

export interface TBookedService {
  id: string;
  user_id: number;
  status: number;
  todos: string;
  required: string;
  schedule: string;
}
