import { Todo, StoreRootState, Action } from "./../types";
import { ThunkDispatch } from "redux-thunk";
import { ActionTypes } from './index';
import { getRequest } from './../../agent/index';

export const createToDo = (payload: { todo: Todo }) => (
  dispatch: ThunkDispatch<StoreRootState, any, Action>
) => (
  dispatch({type: ActionTypes.CREATE_TODO_START, payload})
);

export const getToDos = () => (dispatch: ThunkDispatch<StoreRootState, any, Action>) => {
  console.log("start1")
  dispatch({type: ActionTypes.GET_TODOS_START})
  console.log("start2")
  return getRequest("https://muctodo.a6raywa1cher.com/todo_groups").then((json: any) => {
  dispatch({type: ActionTypes.GET_TODOS_SUCCESS, payload: json})
  }).catch(() => {
    dispatch({type: ActionTypes.GET_TODOS_FAIL})
  })
}
