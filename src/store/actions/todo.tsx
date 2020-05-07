import {
  Todo,
  StoreRootState,
  Action,
  TodoFetch,
  PrimaryKey,
} from "./../types";
import { ThunkDispatch } from "redux-thunk";
import { ActionTypes } from "./index";
import {
  getRequest,
  postRequest,
  deleteRequest,
  patchRequest,
} from "./../../agent/index";
import _ from "lodash";

export const createToDo = (payload: { todo: TodoFetch }) => (
  dispatch: ThunkDispatch<StoreRootState, any, Action>
) => {
  console.log("todo", payload);
  dispatch({ type: ActionTypes.CREATE_TODO_START });
  return postRequest("https://muctodo.a6raywa1cher.com/todos/", payload)
    .then((json: any) => {
      dispatch({ type: ActionTypes.CREATE_TODO_SUCCESS, payload: json });
    })
    .catch((error: any) => {
      dispatch({ type: ActionTypes.CREATE_TODO_FAIL });
    });
};

export const getToDos = () => (
  dispatch: ThunkDispatch<StoreRootState, any, Action>
) => {
  dispatch({ type: ActionTypes.GET_TODOS_START });
  return getRequest("https://muctodo.a6raywa1cher.com/todo_groups/")
    .then((json: any) => {
      dispatch({
        type: ActionTypes.GET_TODOS_SUCCESS,
        payload: _.keyBy(json, "id"),
      });
    })
    .catch((error: any) => {
      console.error("getRequestError", error);
      dispatch({ type: ActionTypes.GET_TODOS_FAIL });
    });
};

export const createGroup = (payload: { title: string }) => (
  dispatch: ThunkDispatch<StoreRootState, any, Action>
) => {
  dispatch({ type: ActionTypes.CREATE_GROUP_START });
  return postRequest("https://muctodo.a6raywa1cher.com/todo_groups/", {
    todo_group_data: { title: payload.title },
    todo_group_items: {},
  })
    .then((json: any) => {
      dispatch({ type: ActionTypes.CREATE_GROUP_SUCCESS, payload: json });
    })
    .catch((error: any) => {
      console.error("postRequestError", error);
      dispatch({ type: ActionTypes.CREATE_GROUP_FAIL });
    });
};

export const deleteToDo = (payload: { id: PrimaryKey; group: PrimaryKey }) => (
  dispatch: ThunkDispatch<StoreRootState, any, Action>
) => {
  dispatch({ type: ActionTypes.DELETE_TODO_START });
  return deleteRequest(
    `https://muctodo.a6raywa1cher.com/todos/${payload.id}/`,
    payload
  )
    .then((json: any) => {
      dispatch({ type: ActionTypes.DELETE_TODO_SUCCESS, payload });
    })
    .catch((error: any) => {
      console.error("deleteRequestError", error);
      dispatch({ type: ActionTypes.DELETE_TODO_FAIL });
    });
};

export const editToDo = (
  payload: TodoFetch & { id: PrimaryKey; completed?: boolean }
) => (dispatch: ThunkDispatch<StoreRootState, any, Action>) => {
  dispatch({ type: ActionTypes.EDIT_TODO_START });
  return patchRequest(
    `https://muctodo.a6raywa1cher.com/todos/${payload.id}/`,
    payload
  )
    .then((json: any) => {
      dispatch({ type: ActionTypes.EDIT_TODO_SUCCESS, payload: { json } });
    })
    .catch((error: any) => {
      console.error(error);
      dispatch({ type: ActionTypes.EDIT_TODO_FAIL });
    });
};
