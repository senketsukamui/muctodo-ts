import { UserState, Action } from "../types";
import { createReducer } from './../helpers';

const initialState: UserState = {
  token: ""
}

export const userReducer = createReducer<UserState, Action>(
  {}, initialState
)

