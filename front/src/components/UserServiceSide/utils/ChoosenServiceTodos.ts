import { TUserTodo } from "../../../store/middleware_interfaces/middleware_interfaces";

export function ChoosenServiceTodos(toDoData: TUserTodo[], page_id: string) {
  const chosenTodos: TUserTodo[] = [];

  toDoData.forEach((todo) => {
    if (todo.id === page_id) chosenTodos.push(todo);
  });

  return chosenTodos;
}
