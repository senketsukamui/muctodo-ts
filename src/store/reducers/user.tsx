import { UserState, Action } from "../types";
import { createReducer } from './../helpers';
import { ActionTypes } from './../actions/index';

const initialState: UserState = {
  token: "",
  userLogin: false,
  userLoginFailed: false
}

export const userReducer = createReducer<UserState, Action>(
  {
    [ActionTypes.USER_LOGIN_START]: (state:UserState, action: any) => ({
      ...state,
      userLogin: true
    }),
    [ActionTypes.USER_LOGIN_SUCCESS]: (state: UserState, action: any) => ({
      ...state,
      token: action.payload.token,
      userLogin: false,
      userLoginFailed: false
    }),
    [ActionTypes.USER_LOGIN_FAIL]: (state: UserState, action: any) => ({
      ...state,
      userLogin: false,
      userLoginFailed: true
    }),
    [ActionTypes.SET_TOKEN]: (state: UserState, action: any) => ({
      ...state,
      token: action.payload.token
    })
  }, initialState
)

