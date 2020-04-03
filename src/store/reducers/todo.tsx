import { createReducer } from "./../helpers";
import { TodoState } from "../types";
import { Action } from "./../types";
import { ActionTypes } from "./../actions/index";
import _ from "lodash";
const initialState: TodoState = {
  groups: {
    1: {
      id: 1,
      title: "test group",
      user: 1,
      todos: []
    }
  },
  todosLoading: false,
  todosLoadingFailed: false,
  todoCreating: false,
  todoCreatingFailed: false
};

export const toDoReducer = createReducer<TodoState, Action>(
  {
    [ActionTypes.GET_TODOS_START]: (state: TodoState, action: any) => ({
      ...state,
      todosLoading: true
    }),
    [ActionTypes.GET_TODOS_SUCCESS]: (state: TodoState, action: any) => ({
      ...state,
      groups: { ...state.groups, ...action.payload },
      todosLoading: false,
      todosLoadingFailed: false
    }),
    [ActionTypes.GET_TODOS_FAIL]: (state: TodoState, action: any) => ({
      ...state,
      todosLoading: false,
      todosLoadingFailed: true
    }),
    [ActionTypes.CREATE_TODO_START]: (state: TodoState, action: any) => ({
      ...state,
      todoCreating: true
    }),
    [ActionTypes.CREATE_TODO_SUCCESS]: (state: TodoState, action: any) => ({
      ...state,
      groups: {
        ...state.groups,
        [action.payload.group]: {
          ...state.groups[action.payload.group],
          todos: [
            ...state.groups[action.payload.group].todos,
            action.payload
          ]
        }
      },
      todoCreating: false,
      todoCreatingFailed: false
    }),
    [ActionTypes.CREATE_TODO_FAIL]: (state: TodoState, action: any) => ({
      ...state,
      todoCreating: false,
      todoCreatingFailed: true
    })
  },
  initialState
);
