import { createReducer } from "./../helpers";
import { TodoState, Todo } from "../types";
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
  todoEditing: false,
  todoEditingFailed: false,
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
    [ActionTypes.CREATE_TODO_SUCCESS]: (state: TodoState, action: any) => {
      console.log(action);
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.group]: {
            ...state.groups[action.payload.group],
            todos: [
              ...state.groups[action.payload.group].todos,
              action.payload,
            ],
          },
        },
        todoCreating: false,
        todoCreatingFailed: false,
      };
    },
    [ActionTypes.CREATE_TODO_FAIL]: (state: TodoState, action: any) => ({
      ...state,
      todoCreating: false,
      todoCreatingFailed: true,
    }),
    [ActionTypes.CREATE_GROUP_START]: (state: TodoState, action: any) => ({
      ...state,
      groupCreating: true,
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
    [ActionTypes.CREATE_GROUP_FAIL]: (state: TodoState, action: any) => ({
      ...state,
      groupCreating: false,
      groupCreatingFailed: true,
    }),
    [ActionTypes.DELETE_TODO_START]: (state: TodoState, action: any) => ({
      ...state,
      todoDeleting: true,
    }),
    [ActionTypes.DELETE_TODO_SUCCESS]: (state: TodoState, action: any) => ({
      ...state,
      groups: {
        ...state.groups,
        [action.payload.group]: {
          ...state.groups[action.payload.group],
          todos: state.groups[action.payload.group].todos.filter(
            (todo: any) => todo.id !== action.payload.id
          ),
        },
      },
      todoDeleting: false,
      todoDeletingFailed: false,
    }),
    [ActionTypes.DELETE_TODO_FAIL]: (state: TodoState, action: any) => ({
      ...state,
      todoDeletingFailed: true,
      todoDeleting: false,
    }),
    [ActionTypes.EDIT_TODO_START]: (state: TodoState, action: any) => ({
      ...state,
      todoEditing: true,
    }),

    [ActionTypes.EDIT_TODO_SUCCESS]: (state: TodoState, action: any) => {
      const { json } = action.payload;

      const idx = state.groups[json.group].todos.findIndex(
        (todo) => todo.id === json.id
      );
      if (idx === -1) return state;

      const nextGroups = { ...state.groups };
      nextGroups[action.payload.json.group].todos[idx] = action.payload.json;

      return {
        ...state,
        groups: nextGroups,
        todoEditing: false,
        todoEditingFailed: false,
      };
    },
    [ActionTypes.EDIT_TODO_FAIL]: (state: TodoState, action: any) => ({
      ...state,
      todoEditingFailed: true,
      todoEditing: false,
    }),
  },
  initialState
);
