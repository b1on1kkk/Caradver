import axios from "axios";

export async function UnbookedCar(id: number) {
  try {
    await axios.delete(`http://localhost:2000/unbooked_car_by_id?id=${id}`);

    return true;
  } catch (error) {
    return false;
  }
}
