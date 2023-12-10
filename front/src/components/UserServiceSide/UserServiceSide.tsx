import { useReducer, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios, { AxiosError } from "axios";

// components
import UserServiceBlocks from "./UserServiceBlocks/UserServiceBlocks";
import UserServiceCircle from "./UserServiceCircle/UserServiceCircle";
import Input from "../../util_components/Input";
import Todo from "./Todo/Todo";
import NewTodoHandleButton from "./NewTodoHandleButton/NewTodoHandleButton";
import NewTodoButton from "./NewTodoButton/NewTodoButton";
import AcceptTransactionButton from "./util_components/AcceptTransactionButton";
//

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addTodo, removeTodo } from "../../store/features/addingTodos.slice";
import {
  getService,
  getBookedService
} from "../../store/features/serviceData.slice";
import { getAllBookedServices } from "../../store/features/getAllBookedServices.slice";
//

// utils
import { getRandomInt } from "../../utils/random";
import { DOT_TODO_COLORS } from "../../constants";
import { TotalPriceCounting } from "./utils/TotalPriceCounting";
import { AddingNewToDoReducer, AddingNewToDo } from "./utils/ToDoReducer";
import { TUserTodo } from "../../store/middleware_interfaces/middleware_interfaces";
import { ChoosenServiceTodos } from "./utils/ChoosenServiceTodos";
import { Undo2 } from "lucide-react";
//

export default function UserServiceSide() {
  const id = useParams().id;

  const [state, action] = useReducer(AddingNewToDoReducer, {
    text: "",
    newTodoStatus: false
  });

  const [errorText, setErrorText] = useState<string>("");

  const chosenServiceBlock = Object.values(useParams())[0];

  const dispatch = useDispatch<AppDispatch>();
  const toDoData = useSelector((state: RootState) => state.userTodos);
  const user = useSelector((state: RootState) => state.getUser.user);
  const service = useSelector(
    (state: RootState) => state.getService.static_service
  );
  const bookedService = useSelector(
    (state: RootState) => state.getService.booked_service
  );
  const bookedServices = useSelector(
    (state: RootState) => state.BookedServices.booked_serives
  );

  useEffect(() => {
    if (id) {
      dispatch(getService(id!));
      dispatch(getBookedService(id!));
    }
    dispatch(getAllBookedServices());
  }, [id]);

  // resource-intensive part
  useEffect(() => {
    bookedServices.forEach((item) => {
      const todos: TUserTodo[] = JSON.parse(item.todos);
      todos.forEach((todo) => {
        if (!toDoData.find((item) => item.id === todo.id))
          dispatch(addTodo(todo));
      });
    });
  }, [bookedServices]);

  async function BookService() {
    try {
      if (toDoData.find((item) => item.id === id)) {
        const Todos: TUserTodo[] = [];

        toDoData.forEach((todo) => {
          if (todo.id === id) Todos.push(todo);
        });

        await axios.post("http://localhost:2000/book_service", {
          id: id,
          user_id: user[0].id,
          status: true,
          todos: JSON.stringify(Todos),
          required: service[0].required,
          schedule: service[0].schedule
        });

        dispatch(getBookedService(id!));
        dispatch(getAllBookedServices());
        return;
      }

      throw new ReferenceError("Enter what you wanna repair first!");
    } catch (error) {
      if (error instanceof ReferenceError) setErrorText(error.message);
      else if (error instanceof AxiosError) setErrorText(error.response?.data);

      setTimeout(() => {
        setErrorText("");
      }, 2000);
    }
  }

  async function UnBookService(id: string) {
    try {
      await axios.delete(
        `http://localhost:2000/unbooked_service_by_id?id=${id}`
      );

      dispatch(getBookedService(id!));
      dispatch(getAllBookedServices());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-9">
      {/*  */}
      <UserServiceBlocks />
      {/*  */}

      <div
        className={`flex flex-col gap-5 ${
          bookedService[0]
            ? bookedService[0].user_id !== user[0].id
              ? "pointer-events-none opacity-50"
              : ""
            : ""
        }`}
        style={
          Object.keys(useParams()).length > 0
            ? {}
            : {
                opacity: "0.5",
                pointerEvents: "none"
              }
        }
      >
        <div className="flex gap-5">
          {/* circle */}
          <UserServiceCircle toDoData={ChoosenServiceTodos(toDoData, id!)} />
          {/*  */}
          <div className="flex-1">
            {toDoData.map((todo, idx) => {
              if (todo.id === chosenServiceBlock) {
                return (
                  <Todo
                    key={idx}
                    dot_color={todo.dot_color}
                    service_text={todo.text}
                    price={todo.price}
                    user_status={bookedService.length <= 0}
                    remove_todo_function={() => dispatch(removeTodo(idx))}
                  />
                );
              }
              return;
            })}

            {/*  */}
            {state.newTodoStatus ? (
              <div className="bg-white p-4 rounded-lg border-dashed border-2 flex flex-col gap-3">
                <Input
                  wrapper_styles="flex gap-4 px-4 py-3 w-full rounded-lg border-1;"
                  icon_name="FileCog"
                  input_styles="focus:outline-none w-full"
                  placeholder_text="Enter What To Repair"
                  input_type="text"
                  onChange={(e) =>
                    // in this case we change only text property, other keys are the same
                    action({
                      type: AddingNewToDo.SettingTodo,
                      payload: {
                        ...state,
                        text: e.target.value
                      }
                    })
                  }
                  value={state.text}
                />
                <div className="flex gap-3 justify-end">
                  <NewTodoHandleButton
                    text="Cancel"
                    background_color="bg-red-500"
                    handler={() =>
                      action({
                        type: AddingNewToDo.SettingTodo,
                        payload: {
                          ...state,
                          newTodoStatus: !state.newTodoStatus
                        }
                      })
                    }
                  />
                  <NewTodoHandleButton
                    text="Upload"
                    background_color="bg-green-500"
                    handler={() => {
                      dispatch(
                        addTodo({
                          id: chosenServiceBlock,
                          text: state.text,
                          dot_color:
                            DOT_TODO_COLORS[
                              getRandomInt(0, DOT_TODO_COLORS.length - 1)
                            ],
                          price: getRandomInt(10, 1000)
                        })
                      );
                      action({
                        type: AddingNewToDo.SettingTodo,
                        payload: {
                          text: "",
                          newTodoStatus: !state.newTodoStatus
                        }
                      });
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                {bookedService.length <= 0 && (
                  <NewTodoButton
                    new_todo_handler={() =>
                      action({
                        type: AddingNewToDo.SettingTodo,
                        payload: {
                          ...state,
                          newTodoStatus: !state.newTodoStatus
                        }
                      })
                    }
                  />
                )}
              </>
            )}
          </div>
        </div>

        {bookedService[0] ? (
          <>
            {bookedService[0].user_id === user[0].id ? (
              <div className="flex gap-3">
                <div className="flex-1">
                  <AcceptTransactionButton
                    button_text="Order is accepted!"
                    accept_status={true}
                    button_color="bg-green"
                    bookServiceCallback={() => {}}
                  />
                </div>

                <div
                  className="px-5 flex items-center bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in select-none"
                  onClick={() => UnBookService(bookedService[0].id)}
                >
                  <Undo2 color="white" />
                </div>
              </div>
            ) : (
              <AcceptTransactionButton
                button_text="Service is booked"
                accept_status={false}
                button_color="bg-red"
                bookServiceCallback={() => {}}
              />
            )}
          </>
        ) : (
          <>
            {errorText ? (
              <AcceptTransactionButton
                button_text={errorText}
                accept_status={false}
                button_color="bg-red"
                bookServiceCallback={() => {}}
              />
            ) : (
              <AcceptTransactionButton
                button_text={`Pay $${TotalPriceCounting(
                  toDoData,
                  chosenServiceBlock
                )}`}
                accept_status={false}
                button_color="bg-blue"
                bookServiceCallback={BookService}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
