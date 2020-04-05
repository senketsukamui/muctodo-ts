import { Todo, StoreRootState, Action, TodoFetch } from "./../types";
import { ThunkDispatch } from "redux-thunk";
import { ActionTypes } from "./index";
import { getRequest, postRequest } from "./../../agent/index";
import _ from "lodash";

export const createToDo = (payload: { todo: TodoFetch }) => (
  dispatch: ThunkDispatch<StoreRootState, any, Action>
) => {
  console.log(payload);
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
      console.log(json)
      dispatch({ type: ActionTypes.CREATE_GROUP_SUCCESS, payload: json });
    })
    .catch((error: any) => {
      console.error("postRequestError", error);
      dispatch({ type: ActionTypes.CREATE_GROUP_FAIL });
    });
};
