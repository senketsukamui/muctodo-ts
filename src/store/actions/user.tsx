import { ThunkDispatch } from "redux-thunk";
import { StoreRootState, Action } from "../types";
import { ActionTypes } from ".";
import { postRequest } from "../../agent";
import { setLocalStorageToken } from "../../utils";

export const userLogin = (payload: { username: string, password: string  }) => (
  dispatch: ThunkDispatch<StoreRootState, any, Action>
) => {
  dispatch({ type: ActionTypes.USER_LOGIN_START });
  return postRequest("https://muctodo.a6raywa1cher.com/api-auth", payload)
    .then((json: any) => {
      dispatch({ type: ActionTypes.USER_LOGIN_SUCCESS, payload: json });
      setLocalStorageToken(json.token)
      window.location.reload()
    }).catch((error: any) => {
      console.error(error)
      dispatch({type: ActionTypes.USER_LOGIN_FAIL})
    })
};

export const setToken = (payload: {token: string}) => (dispatch: ThunkDispatch<StoreRootState, any, Action>) => {
  dispatch({type: ActionTypes.SET_TOKEN, payload})
}

export const deleteToken = () => (dispatch: ThunkDispatch<StoreRootState, any, Action>) => {
  dispatch({type: ActionTypes.DELETE_TOKEN})
}