import { ThunkDispatch } from "redux-thunk";
import { StoreRootState, Action } from "../types";
import { ActionTypes } from ".";
import { postRequest } from "../../agent";

export const userLogin = (payload: { token: string }) => (
  dispatch: ThunkDispatch<StoreRootState, any, Action>
) => {
  dispatch({ type: ActionTypes.USER_LOGIN_START });
  return postRequest("https://muctodo.a6raywa1cher.com/api-auth/", payload)
    .then((json: any) => {
      dispatch({ type: ActionTypes.USER_LOGIN_SUCCESS, payload: json });
    })
    .catch((error: any) => {
      (error: any) => {
        console.error(error);
        dispatch({ type: ActionTypes.USER_LOGIN_FAIL });
      };
    });
};
