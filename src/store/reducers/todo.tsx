import { createReducer } from "./../helpers";
import { TodoState } from "../types";
import { Action } from "./../types";
import { ActionTypes } from "./../actions/index";
const initialState: TodoState = {
  groups: [],
  todosLoading: false,
  todosLoadingFailed: false
};

export const toDoReducer = createReducer<TodoState, Action>(
  {
    [ActionTypes.CREATE_TODO_START]: (state: TodoState, action: any) => ({
      ...state,
      todosLoading: true
    }),
    [ActionTypes.CREATE_TODO_SUCCESS]: (state: TodoState, action: any) => ({
      ...state,
      groups: [...state.groups, action.payload],
      todosLoading: false,
      todosLoadingFailed: false
    }),
    [ActionTypes.CREATE_TODO_FAIL]: (state: TodoState, action: any) => ({
      ...state,
      todosLoading: false,
      todosLoadingFailed: true
    })
  },
  initialState
);
