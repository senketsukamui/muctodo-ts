import { Action, combineReducers } from 'redux'
import { StoreRootState } from '../types'

export const rootLevelReducer = (state: StoreRootState, action: Action) => {
  const topLevelReducer = combineReducers({
  })

  return topLevelReducer(state as any, action as any)
}
