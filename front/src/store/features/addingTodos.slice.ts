import { createSlice } from "@reduxjs/toolkit";

import { TUserTodo } from "../middleware_interfaces/middleware_interfaces";

const initialState: TUserTodo[] = [];

const UserTodos = createSlice({
  name: "userTodos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.splice(action.payload, 1);
    }
  }
});

export const { addTodo, removeTodo } = UserTodos.actions;

export default UserTodos;
