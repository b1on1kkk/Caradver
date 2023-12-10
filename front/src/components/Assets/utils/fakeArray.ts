import type { Car } from "../../../store/middleware_interfaces/middleware_interfaces";

export function FakeArrayGenerator(cars: Car) {
  const { price, make, brand, power, registration, fuel, mileage, gear } = cars;

  return [
    { title: "price", value: price.toString(), icon: "CircleDollarSign" },
    { title: "make", value: make, icon: "CarFront" },
    { title: "brand", value: brand, icon: "CarFront" },
    { title: "power", value: power, icon: "Zap" },
    { title: "registration", value: registration, icon: "ClipboardList" },
    { title: "fuel", value: fuel, icon: "Fuel" },
    { title: "mileage", value: mileage, icon: "MapPinned" },
    { title: "gear", value: gear, icon: "Cog" }
  ];
}
