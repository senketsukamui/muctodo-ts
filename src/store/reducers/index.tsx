import { Action, combineReducers } from 'redux'
import { StoreRootState } from '../types'
import { toDoReducer } from './todo';

export const rootLevelReducer = (state: StoreRootState, action: Action) => {
  const topLevelReducer = combineReducers({
    todos: toDoReducer
  })

  return topLevelReducer(state as any, action as any)
}
