export enum AddingNewToDo {
  SettingTodo = "SettingTodo"
}

interface AddingNewToDoAction {
  type: AddingNewToDo;
  payload: {
    text: string;
    newTodoStatus: boolean;
  };
}

interface AddingNewToDoState {
  text: string;
  newTodoStatus: boolean;
}

export function AddingNewToDoReducer(
  state: AddingNewToDoState,
  action: AddingNewToDoAction
) {
  const { type, payload } = action;

  switch (type) {
    case AddingNewToDo.SettingTodo:
      return {
        ...state,
        text: payload.text,
        newTodoStatus: payload.newTodoStatus
      };
  }
}
