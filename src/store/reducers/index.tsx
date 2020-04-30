import { Action, combineReducers } from 'redux'
import { StoreRootState } from '../types'
import { toDoReducer } from './todo';
import { userReducer } from './user';

export const rootLevelReducer = (state: StoreRootState, action: Action) => {
  const topLevelReducer = combineReducers({
    todo: toDoReducer,
    user: userReducer
  })

  return topLevelReducer(state as any, action as any)
}
