import { TUserTodo } from "../../../store/middleware_interfaces/middleware_interfaces";

export function TotalPriceCounting(
  ToDosArray: TUserTodo[],
  idx: string | undefined
) {
  let totalSum = 0;
  ToDosArray.forEach((item) => {
    if (item.id === idx) {
      totalSum += item.price;
    }
  });

  return totalSum;
}
