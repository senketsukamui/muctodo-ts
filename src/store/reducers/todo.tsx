import { createReducer } from "./../helpers";
import { TodoState } from "../types";
import { Action } from "./../types";
import { ActionTypes } from "./../actions/index";
import _ from "lodash";
const initialState: TodoState = {
  groups: {},
  todosLoading: false,
  todosLoadingFailed: false,
  todoCreating: false,
  todoCreatingFailed: false,
  todoDeleting: false,
  todoDeletingFailed: false,
  groupCreating: false,
  groupCreatingFailed: false,
};

export const toDoReducer = createReducer<TodoState, Action>(
  {
    [ActionTypes.GET_TODOS_START]: (state: TodoState, action: any) => ({
      ...state,
      todosLoading: true,
    }),
    [ActionTypes.GET_TODOS_SUCCESS]: (state: TodoState, action: any) => ({
      ...state,
      groups: { ...state.groups, ...action.payload },
      todosLoading: false,
      todosLoadingFailed: false,
    }),
    [ActionTypes.GET_TODOS_FAIL]: (state: TodoState, action: any) => ({
      ...state,
      todosLoading: false,
      todosLoadingFailed: true,
    }),
    [ActionTypes.CREATE_TODO_START]: (state: TodoState, action: any) => ({
      ...state,
      todoCreating: true,
    }),
    [ActionTypes.CREATE_TODO_SUCCESS]: (state: TodoState, action: any) => ({
      ...state,
      groups: {
        ...state.groups,
        [action.payload.group]: {
          ...state.groups[action.payload.group],
          todos: [...state.groups[action.payload.group].todos, action.payload],
        },
      },
      todoCreating: false,
      todoCreatingFailed: false,
    }),
    [ActionTypes.CREATE_TODO_FAIL]: (state: TodoState, action: any) => ({
      ...state,
      todoCreating: false,
      todoCreatingFailed: true,
    }),
    [ActionTypes.CREATE_GROUP_START]: (state: TodoState, action: any) => ({
      ...state,
      todoCreating: true,
    }),
    [ActionTypes.CREATE_GROUP_SUCCESS]: (state: TodoState, action: any) => ({
      ...state,
      groups: {
        ...state.groups,
        [action.payload.id]: action.payload,
      },
      groupCreating: false,
      groupCreatingFailed: false,
    }),
    [ActionTypes.DELETE_TODO_START]: (state: TodoState, action: any) => ({
      ...state,
    }),
    [ActionTypes.DELETE_TODO_SUCCESS]: (state: TodoState, action: any) => ({
      ...state,
      groups: {
        ...state.groups,
        [action.payload.group]: {
          ...state.groups[action.payload.group],
          todos: 
            state.groups[action.payload.group].todos.filter(
              (todo: any) => todo.id !== action.payload.id
            ),
        },
      },
    }),
  },
  initialState
);
